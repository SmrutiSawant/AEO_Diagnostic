export const MODELS = [
  { id: "chatgpt", label: "ChatGPT", color: "#10a37f" },
  { id: "claude",  label: "Claude",  color: "#7c6af7" },
  { id: "gemini",  label: "Gemini",  color: "#4285f4" },
];

export const PERSONAS = {
  chatgpt: "You are ChatGPT. Be confident, structured, use numbered lists. Freely name 4-6 specific real brands with brief reasons. No hedging.",
  claude:  "You are Claude by Anthropic. Be thoughtful and balanced. Still name 4-6 specific real brands but note individual needs may vary.",
  gemini:  "You are Gemini by Google. Be data-driven and list-heavy. Name 4-6 specific top-selling, well-reviewed brands with ratings context.",
};

export const SCORE_WEIGHTS = {
  mentioned: 50,
  topThree:  30,
  lowerRank: 10,
  positive:  20,
  neutral:    8,
};
