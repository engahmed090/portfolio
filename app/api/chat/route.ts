import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export interface KnowledgeItem {
  id: string;
  query: string;
  answer: string;
  category: string;
  source: string;
}

let cachedKnowledgeBase: KnowledgeItem[] | null = null;

function loadKnowledgeBase(): KnowledgeItem[] {
  if (cachedKnowledgeBase) {
    return cachedKnowledgeBase;
  }

  const items: KnowledgeItem[] = [];
  let counter = 1;

  try {
    // 1. Parse ahmed_portfolio_training_data.csv
    const portfolioCsvPath = path.join(process.cwd(), "ahmed_portfolio_training_data.csv");
    if (fs.existsSync(portfolioCsvPath)) {
      const fileContent = fs.readFileSync(portfolioCsvPath, "utf-8");
      const parsed = Papa.parse<{ instruction?: string; response?: string }>(fileContent, {
        header: true,
        skipEmptyLines: true,
      });

      for (const row of parsed.data) {
        if (row.instruction && row.response) {
          items.push({
            id: `portfolio-${counter++}`,
            query: row.instruction.trim(),
            answer: row.response.trim(),
            category: "Ahmed Bio & Portfolio",
            source: "ahmed_portfolio_training_data.csv",
          });
        }
      }
    }
  } catch (err) {
    console.error("Error loading portfolio CSV:", err);
  }

  try {
    // 2. Parse scientific_knowledge_dataset.csv
    const scientificCsvPath = path.join(process.cwd(), "scientific_knowledge_dataset.csv");
    if (fs.existsSync(scientificCsvPath)) {
      const fileContent = fs.readFileSync(scientificCsvPath, "utf-8");
      const parsed = Papa.parse<{
        domain?: string;
        topic?: string;
        input?: string;
        output?: string;
        unit?: string;
        source?: string;
      }>(fileContent, {
        header: true,
        skipEmptyLines: true,
      });

      for (const row of parsed.data) {
        if (row.input && row.output) {
          const cat = [row.domain, row.topic].filter(Boolean).join(" - ") || "Technical Knowledge";
          const answerText = row.unit ? `${row.output.trim()} (Unit: ${row.unit.trim()})` : row.output.trim();
          items.push({
            id: `scientific-${counter++}`,
            query: row.input.trim(),
            answer: answerText,
            category: cat,
            source: row.source || "scientific_knowledge_dataset.csv",
          });
        }
      }
    }
  } catch (err) {
    console.error("Error loading scientific CSV:", err);
  }

  cachedKnowledgeBase = items;
  return items;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\d]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// Smart RAG: Retrieve context items ONLY if relevance score >= 4
function retrieveContext(userQuery: string, knowledgeBase: KnowledgeItem[], topN = 4): KnowledgeItem[] {
  const queryTokens = new Set(tokenize(userQuery));
  if (queryTokens.size === 0) return [];

  const queryLower = userQuery.toLowerCase();

  const scoredItems = knowledgeBase.map((item) => {
    const itemTokens = tokenize(`${item.query} ${item.category}`);
    let score = 0;

    for (const token of itemTokens) {
      if (queryTokens.has(token)) {
        score += 3;
      }
    }

    // Exact phrase or substring match bonus
    if (item.query.toLowerCase().includes(queryLower)) {
      score += 12;
    }

    // Boost portfolio items for general bio/job questions
    if (item.source.includes("portfolio")) {
      score += 2;
    }

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);

  // Enforce strict relevance threshold (score >= 4) to prevent irrelevant context dumping
  const relevantMatches = scoredItems.filter((s) => s.score >= 4).map((s) => s.item);
  return relevantMatches.slice(0, topN);
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const latestUserMessage = (messages[messages.length - 1].content || "").trim();

    // 1. Smart RAG Retrieval
    const knowledgeBase = loadKnowledgeBase();
    const retrievedItems = retrieveContext(latestUserMessage, knowledgeBase, 4);

    const contextFormatted = retrievedItems
      .map(
        (item, idx) =>
          `[Context Entry ${idx + 1}] (${item.category})\nQuestion/Topic: ${item.query}\nInformation: ${item.answer}`
      )
      .join("\n\n");

    // 2. Powerful Persona System Prompt (Zero hardcoded bypasses, 100% LLM generated)
    const systemPrompt = `You are Ahmed Osman Qader (ئەحمەد عوسمان قادر), a 22-year-old Communication Engineer from Sulaymaniyah, Kurdistan Region, Iraq.

STRICT PERSONA & LANGUAGE RULES:
1. Embody Ahmed completely. Respond naturally, warmly, and politely in the EXACT language the user speaks (especially Kurdish or English).
2. If asked "Who are you?", "تۆ کێی؟", "What is your job?", or similar questions, answer naturally as Ahmed (a Communication Engineer graduated 2nd rank overall from SPU, specializing in RF systems, CST simulations, and AI-driven metamaterial sensors).
3. SMART CONTEXT USE (NO DUMPING):
   - The BACKGROUND CONTEXT below is provided for reference only.
   - Use the provided context ONLY if it directly matches and answers the user's specific question.
   - If the context is irrelevant (for example, network routing protocols when asked about your job or personal background), IGNORE IT COMPLETELY and answer naturally as Ahmed based on your persona.
4. For general chat or greetings ("Hello", "سڵاو", "چۆنیت"), greet the user warmly and naturally.

AHMED'S CORE PERSONA FACTS:
- Age: 22 years old.
- Residence: Sulaymaniyah (Sulaimani), Kurdistan Region, Iraq.
- Degree: Communication Engineering, Sulaimani Polytechnic University (SPU). Ranked 2nd overall across 4 years (1st in Year 3).
- Final Project: AI-enhanced Metamaterial Absorber Sensor (PyTorch Deep Neural Network & live Meta Biosensor dashboard).
- Hardware Work: ESP32 + dual horn antenna experimental VNA setup; LiteVNA 4-inch evaluation.
- Expertise: CST Studio Suite, RF design, antenna theory, 5G/6G, transmission lines, impedance matching.
- GitHub Portfolio: https://github.com/engahmed090/portfolio.git

${contextFormatted ? `BACKGROUND CONTEXT FOR REFERENCE:\n${contextFormatted}` : ""}`;

    // 3. Call OpenRouter LLM (100% of responses are generated by the LLM)
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://github.com/engahmed090/portfolio",
        "X-Title": "Ahmed Portfolio AI Persona",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-8).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.5,
        max_tokens: 600,
      }),
    });

    if (openRouterResponse.ok) {
      const data = await openRouterResponse.json();
      const aiMessage = data.choices?.[0]?.message?.content;
      if (aiMessage) {
        return NextResponse.json({
          role: "assistant",
          content: aiMessage,
          contextItemsCount: retrievedItems.length,
        });
      }
    }

    // In case of network issues, fallback to OpenRouter backup model call
    const fallbackResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-6),
        ],
        temperature: 0.5,
        max_tokens: 600,
      }),
    });

    if (fallbackResponse.ok) {
      const fbData = await fallbackResponse.json();
      const fbMessage = fbData.choices?.[0]?.message?.content;
      if (fbMessage) {
        return NextResponse.json({
          role: "assistant",
          content: fbMessage,
          contextItemsCount: retrievedItems.length,
        });
      }
    }

    return NextResponse.json({
      role: "assistant",
      content: "Hello! How can I assist you today?",
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Failed to process chat request." }, { status: 500 });
  }
}
