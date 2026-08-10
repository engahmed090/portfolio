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

// Retrieve relevant context items using token overlap scoring
function retrieveContext(userQuery: string, knowledgeBase: KnowledgeItem[], topN = 8): KnowledgeItem[] {
  const queryTokens = new Set(tokenize(userQuery));
  if (queryTokens.size === 0) return knowledgeBase.slice(0, topN);

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

  const positiveMatches = scoredItems.filter((s) => s.score > 0).map((s) => s.item);
  if (positiveMatches.length > 0) {
    return positiveMatches.slice(0, topN);
  }

  return knowledgeBase.slice(0, topN);
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1].content || "";

    // 1. Load Knowledge Base & Retrieve Context
    const knowledgeBase = loadKnowledgeBase();
    const retrievedItems = retrieveContext(latestUserMessage, knowledgeBase, 8);

    const contextFormatted = retrievedItems
      .map(
        (item, idx) =>
          `[Context Item ${idx + 1}] Category: ${item.category}\nTopic/Question: ${item.query}\nDetails/Answer: ${item.answer}`
      )
      .join("\n\n");

    // 2. Formulate Unrestricted 1st-Person System Prompt (Ahmed Persona)
    const systemPrompt = `You are Ahmed Osman Qader (ئەحمەد عوسمان قادر), a 22-year-old Communication Engineer from Sulaymaniyah, Kurdistan Region, Iraq.

CORE PERSONA & IDENTITY RULES:
- Speak ALWAYS directly in the first person as Ahmed ("I am Ahmed...", "My final project...", "ناوم ئەحمەد عوسمان قادرە...").
- You are friendly, articulate, professional, and confident. You enjoy chatting about your life, engineering projects, AI, telecom, and general topics.
- NEVER trigger any hardcoded refusal or decline to answer. Respond naturally to greetings ("Hello", "چۆنیت", "سڵاو"), personal questions ("Who are you?", "کێیت"), career discussions, and general inquiries as Ahmed.
- MULTILINGUAL RESPONSIBLITY: Automatically detect the language of the user's message and reply in THAT EXACT LANGUAGE.
  * If the user writes in Kurdish (Sorani dialect), reply in natural, fluent Kurdish (سۆرانی).
  * If the user writes in English, reply in natural, clear English.
  * If the user writes in Arabic, reply in clear Arabic.
- BACKGROUND FACTS (Integrate naturally when relevant):
  * Age: 22 years old.
  * Residence: Sulaymaniyah (Sulaimani), Kurdistan Region, Iraq.
  * Degree: Communication Engineering. Graduated 2nd overall rank across all 4 years at Sulaimani Polytechnic University (SPU), and 1st in Year 3.
  * University Final Project: Metamaterial absorber design for sensing applications enhanced with AI techniques (built a PyTorch Deep Neural Network and live Meta Biosensor dashboard).
  * Hardware & RF Work: Engineered an ESP32 microcontroller with dual horn antennas to act like an experimental VNA; evaluated the LiteVNA 4-inch.
  * Core Engineering Expertise: CST Studio Suite simulation, impedance matching, transmission lines, multi-section quarter-wave transformers, antenna theory, 5G/6G, MIMO systems.
  * GitHub Portfolio: https://github.com/engahmed090/portfolio.git

KNOWLEDGE BASE CONTEXT (Use exact figures/data from here when answering specific technical or portfolio questions):
${contextFormatted}`;

    // 3. Call OpenRouter LLM API
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
          max_tokens: 700,
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
      } else {
        console.warn("OpenRouter API non-OK status:", openRouterResponse.status, await openRouterResponse.text());
      }
    } catch (llmErr) {
      console.error("LLM Call Error:", llmErr);
    }

    // 4. Natural Fallback Response if LLM call fails
    const isKurdishQuery = /[\u0600-\u06FF]/.test(latestUserMessage);
    const fallbackMessage = isKurdishQuery
      ? `سڵاو! ناوم ئەحمەد عوسمان قادرە، ئەندازیاری گەیاندنم لە سلێمانی. پلەی دووەمم بەدەستهێناوە لە زانکۆ و پڕۆژەی دەرچوونم لەسەر metamaterial absorber بوو کە بە PyTorch پەرەم پێداوە.`
      : `Hi! I am Ahmed Osman Qader, a 22-year-old Communication Engineer from Sulaymaniyah, Iraq. I ranked 2nd overall in my degree and specialized in AI-enhanced metamaterial sensors and RF hardware engineering.`;

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
