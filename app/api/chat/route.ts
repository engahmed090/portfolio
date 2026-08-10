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

// In-memory cache for parsed knowledge items
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
            category: "Ahmed Portfolio & Bio",
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

// Tokenize text for keyword similarity calculation
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\d]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// Retrieve relevant context items ONLY if score > 0
function retrieveContext(userQuery: string, knowledgeBase: KnowledgeItem[], topN = 6): KnowledgeItem[] {
  const queryTokens = new Set(tokenize(userQuery));
  if (queryTokens.size === 0) return [];

  const scoredItems = knowledgeBase.map((item) => {
    const itemTokens = tokenize(`${item.query} ${item.answer} ${item.category}`);
    let score = 0;

    for (const token of itemTokens) {
      if (queryTokens.has(token)) {
        score += 2;
      }
    }

    const queryLower = userQuery.toLowerCase();
    if (item.query.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);

  // Return ONLY positive matches (do NOT slice arbitrary items when score is 0!)
  const positiveMatches = scoredItems.filter((s) => s.score > 0).map((s) => s.item);
  return positiveMatches.slice(0, topN);
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

    // 1. Load Knowledge Base & Retrieve Relevant Context (Empty if no keyword match)
    const knowledgeBase = loadKnowledgeBase();
    const retrievedItems = retrieveContext(latestUserMessage, knowledgeBase, 6);

    const contextFormatted = retrievedItems
      .map(
        (item, idx) =>
          `[Item ${idx + 1}] Category: ${item.category}\nTopic: ${item.query}\nData: ${item.answer}`
      )
      .join("\n\n");

    // 2. Formulate Conversational Persona System Prompt (No forced introductions!)
    const systemPrompt = `You are Ahmed Osman Qader (ئەحمەد عوسمان قادر), a 22-year-old Communication Engineer from Sulaymaniyah, Kurdistan Region, Iraq.

CONVERSATIONAL & PERSONA RULES:
1. NO FORCED INTRODUCTIONS: DO NOT state your full bio or introduce yourself unless the user specifically asks "Who are you?", "Tell me about yourself", or "تو کێیت؟".
2. NATURAL GREETINGS: If the user says a simple greeting like "Hi", "Hello", "سڵاو", or "چۆنیت", reply naturally with a short, warm greeting (e.g. "Hello! How can I help you today?" or "سڵاو! فەرموو چۆن دەتوانم یارمەتیت بدەم؟").
3. HANDLE GIBBERISH / NONSENSE: If the user types gibberish or random letters (e.g. "pp", "asdf", "123"), politely ask for clarification (e.g. "Sorry, I didn't quite catch that. Could you clarify your question?").
4. SMART CONTEXT USE: Use the REFERENCE CONTEXT below ONLY to accurately answer specific questions about Ahmed's portfolio, projects, skills, or education. DO NOT copy-paste context or recite facts out of context.
5. MULTILINGUAL RESPONSES: Respond in the exact language used by the user. If the user writes in Kurdish (Sorani dialect), reply in natural Kurdish. If in English, reply in natural English.

BACKGROUND FACTS (Reference when naturally asked):
- Degree: Communication Engineering, Sulaimani Polytechnic University (SPU). Ranked 2nd overall across 4 years (1st in Year 3).
- Final Project: Metamaterial Absorber Design for sensing applications enhanced with AI techniques (PyTorch Deep Neural Network & live Meta Biosensor dashboard).
- Hardware: ESP32 + dual horn antenna experimental VNA setup; LiteVNA evaluation.
- Expertise: CST Studio Suite, RF design, antenna theory, 5G/6G, transmission lines, impedance matching.
- GitHub Portfolio: https://github.com/engahmed090/portfolio.git

${contextFormatted ? `REFERENCE CONTEXT (Use only if relevant to user question):\n${contextFormatted}` : ""}`;

    // 3. Call OpenRouter LLM API if key is present
    if (OPENROUTER_API_KEY) {
      try {
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
      } catch (llmErr) {
        console.error("LLM Call Error:", llmErr);
      }
    }

    // 4. Conversational Fallback Logic (Handles greetings, gibberish, intros, and queries naturally)
    const isKurdish = /[\u0600-\u06FF]/.test(latestUserMessage);
    const lowerQuery = latestUserMessage.toLowerCase();

    let fallbackMessage = "";

    // Greetings
    if (/^(hi|hello|hey|greetings|سڵاو|سلاو|چۆنیت|چۆنی)$/i.test(lowerQuery)) {
      fallbackMessage = isKurdish
        ? "سڵاو! فەرموو چۆن دەتوانم یارمەتیت بدەم؟"
        : "Hello! How can I help you today?";
    }
    // "Who are you?" / "تو کێیت"
    else if (lowerQuery.includes("who are you") || lowerQuery.includes("tell me about yourself") || lowerQuery.includes("کێیت")) {
      fallbackMessage = isKurdish
        ? "سڵاو! ناوم ئەحمەد عوسمان قادرە، ئەندازیاری گەیاندنم لە سلێمانی. خاوەنی پلەی دووەمم لە زانکۆی پۆلیتەکنیکی سلێمانی و پەرەم بە پڕۆژەی دەرچوونی سێنسەری metamaterial داوە بە هاوکاری ژیری دەستکرد (PyTorch)."
        : "Hi! I am Ahmed Osman Qader, a 22-year-old Communication Engineer from Sulaymaniyah, Iraq. I ranked 2nd overall at SPU and specialized in AI-driven metamaterial sensors and RF hardware engineering.";
    }
    // Gibberish / Very short unmatched tokens
    else if (latestUserMessage.length <= 3 && !["rf", "ai", "5g", "vna"].includes(lowerQuery)) {
      fallbackMessage = isKurdish
        ? "تێنەگەیشتم، دەتوانیت زیاتر ڕوونی بکەیتەوە؟"
        : "Sorry, I didn't quite catch that. Could you clarify your question?";
    }
    // Top retrieved match if available
    else if (retrievedItems.length > 0) {
      fallbackMessage = retrievedItems[0].answer;
    }
    // Default friendly response
    else {
      fallbackMessage = isKurdish
        ? "چۆن دەتوانم یارمەتیت بدەم دەربارەی پڕۆژەکانی ئەندازیاری و کارەکانم؟"
        : "How can I assist you regarding my communication engineering projects and background?";
    }

    return NextResponse.json({
      role: "assistant",
      content: fallbackMessage,
      contextItemsCount: retrievedItems.length,
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Failed to process chat request." }, { status: 500 });
  }
}
