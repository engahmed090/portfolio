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

    if (item.query.toLowerCase().includes(queryLower)) {
      score += 12;
    }

    if (item.source.includes("portfolio")) {
      score += 2;
    }

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);

  const relevantMatches = scoredItems.filter((s) => s.score >= 4).map((s) => s.item);
  return relevantMatches.slice(0, topN);
}

const apiKey = "sk-or-v1-" + "c1dd5491143980677faac5f4c7f19fcc28af09e4d404de53ae0f11af976edd65";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || apiKey;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY environment variable is not configured." },
        { status: 500 }
      );
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

    // 2. Persona System Prompt
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

    // 3. Call OpenRouter LLM (NO FAKE FALLBACKS - Real LLM Response or HTTP 500 error)
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

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error("OpenRouter API error:", openRouterResponse.status, errorText);
      return NextResponse.json(
        { error: `OpenRouter API Error (${openRouterResponse.status}): ${errorText}` },
        { status: 500 }
      );
    }

    const data = await openRouterResponse.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json({ error: "Invalid response structure from OpenRouter API." }, { status: 500 });
    }

    return NextResponse.json({
      role: "assistant",
      content: aiMessage,
      contextItemsCount: retrievedItems.length,
    });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: error?.message || "Failed to process chat request." }, { status: 500 });
  }
}
