import { SCORE_WEIGHTS } from "./constants";

export function calcScore(a) {
  let s = 0;
  if (a.mentioned) s += SCORE_WEIGHTS.mentioned;
  if (a.rank != null && a.rank <= 3) s += SCORE_WEIGHTS.topThree;
  else if (a.rank != null) s += SCORE_WEIGHTS.lowerRank;
  if (a.sentiment === "positive") s += SCORE_WEIGHTS.positive;
  else if (a.sentiment === "neutral") s += SCORE_WEIGHTS.neutral;
  return Math.min(s, 100);
}

export function scoreColor(s) {
  if (s >= 70) return "#2ecc8e";
  if (s >= 40) return "#f0a82e";
  return "#e05c75";
}

export function buildAnalysisPrompt(product, query, responses) {
  return `You are an AI search visibility analyst.

PRODUCT TO TRACK: "${product}"
QUERY: "${query}"

ChatGPT Response:
${responses.chatgpt}

Claude Response:
${responses.claude}

Gemini Response:
${responses.gemini}

Return ONLY valid JSON (no markdown, no backticks):
{
  "analysis": {
    "chatgpt": { "mentioned": bool, "rank": null|int, "sentiment": "positive"|"neutral"|"negative"|"not mentioned", "competitors": ["Brand",...] },
    "claude":  { "mentioned": bool, "rank": null|int, "sentiment": "positive"|"neutral"|"negative"|"not mentioned", "competitors": ["Brand",...] },
    "gemini":  { "mentioned": bool, "rank": null|int, "sentiment": "positive"|"neutral"|"negative"|"not mentioned", "competitors": ["Brand",...] }
  },
  "allCompetitors": [{"name":"Brand","mentions":2},...sorted by mentions desc, max 6],
  "insights": "2-3 sentences of strategic insight about visibility",
  "improvements": ["actionable tip 1","tip 2","tip 3","tip 4"]
}`;
}
