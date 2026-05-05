// ============================================================
// API Configuration — Gemini Only (Free Forever)
// Only 1 key needed in .env:
//   REACT_APP_GEMINI_API_KEY → aistudio.google.com/app/apikey
//
// Uses gemini-1.5-flash-8b — highest free tier limits:
//   1500 requests/day, 15 req/min, 1M tokens/min
//
// OPTIMIZED: Only 2 API calls per full diagnostic run
//   Call 1 → All 3 model responses in one prompt
//   Call 2 → Full analysis + report generation
// ============================================================

const GEMINI_MODEL = "gemini-2.5-flash-lite";

async function geminiRequest(prompt, maxTokens = 2000) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing REACT_APP_GEMINI_API_KEY in .env — get it free at aistudio.google.com/app/apikey");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    }
  );

  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    const retryAfter = err?.error?.message?.match(/(\d+)s/)?.[1];
    const waitMsg = retryAfter ? `Please wait ${retryAfter} seconds and try again.` : "Please wait 60 seconds and try again.";
    throw new Error(`Rate limit hit. ${waitMsg}`);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${err?.error?.message || res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ── CALL 1: Get all 3 model responses in one single API call ──
export async function callAllModels(query) {
  const prompt = `Simulate 3 different AI assistants answering this question: "${query}. Give me 4-6 specific product recommendations with brief reasons."

Use EXACTLY this format with these exact headers:

===CHATGPT===
[As ChatGPT: confident tone, numbered list, 4-6 real brand names, one short reason each, no disclaimers]

===CLAUDE===
[As Claude: thoughtful tone, 4-6 real brand names, note suitability for different needs]

===GEMINI===
[As Gemini: data-driven, 4-6 real top-rated brand names, mention ratings or popularity]`;

  const raw = await geminiRequest(prompt, 2000);

  return {
    chatgpt: extractSection(raw, "CHATGPT", "CLAUDE"),
    claude:  extractSection(raw, "CLAUDE",  "GEMINI"),
    gemini:  extractSection(raw, "GEMINI",  null),
  };
}

function extractSection(text, startTag, endTag) {
  const start = text.indexOf(`===${startTag}===`);
  if (start === -1) return "(No response captured)";
  const contentStart = start + `===${startTag}===`.length;
  const end = endTag ? text.indexOf(`===${endTag}===`) : text.length;
  return text.slice(contentStart, end === -1 ? text.length : end).trim();
}

// ── CALL 2: Full analysis in one single API call ──
export async function callAnalysis(product, query, responses) {
  const prompt = `You are an AI search visibility analyst. Output ONLY valid JSON, no markdown, no backticks, no extra text.

PRODUCT TO TRACK: "${product}"
QUERY: "${query}"

ChatGPT Response: ${responses.chatgpt}
Claude Response: ${responses.claude}
Gemini Response: ${responses.gemini}

Return this exact JSON:
{
  "analysis": {
    "chatgpt": { "mentioned": true or false, "rank": null or 1 or 2 etc, "sentiment": "positive" or "neutral" or "negative" or "not mentioned", "competitors": ["Brand1","Brand2","Brand3"] },
    "claude":  { "mentioned": true or false, "rank": null or 1 or 2 etc, "sentiment": "positive" or "neutral" or "negative" or "not mentioned", "competitors": ["Brand1","Brand2","Brand3"] },
    "gemini":  { "mentioned": true or false, "rank": null or 1 or 2 etc, "sentiment": "positive" or "neutral" or "negative" or "not mentioned", "competitors": ["Brand1","Brand2","Brand3"] }
  },
  "allCompetitors": [{"name":"Brand","mentions":2},{"name":"Brand2","mentions":1}],
  "insights": "2-3 sentences of strategic insight about the product visibility",
  "improvements": ["tip1","tip2","tip3","tip4"]
}`;

  return await geminiRequest(prompt, 1500);
}
