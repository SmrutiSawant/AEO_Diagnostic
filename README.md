# AEO Diagnostic Tool
### Optimize Your Product for AI Search Engines

See how your product ranks across **real** ChatGPT, Claude & Gemini API responses.  
Get your visibility score, competitor analysis, and AI-powered recommendations.

---

## 🚀 Quick Start

### 1. Unzip and enter the folder
```bash
cd aeo-diagnostic
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API keys
```bash
cp .env.example .env
```

Open `.env` and fill in all 3 keys:

```env
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...   # console.anthropic.com
REACT_APP_OPENAI_API_KEY=sk-...          # platform.openai.com/api-keys
REACT_APP_GEMINI_API_KEY=AIza...         # aistudio.google.com/app/apikey
```

### 4. Start the app
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Where to get API keys

| Model   | Provider | Link | Free tier? |
|---------|----------|------|------------|
| ChatGPT | OpenAI   | platform.openai.com/api-keys | Trial credits on signup |
| Claude  | Anthropic | console.anthropic.com | Trial credits on signup |
| Gemini  | Google   | aistudio.google.com/app/apikey | ✅ Free tier available |

---

## 🏗️ Project Structure

```
aeo-diagnostic/
├── public/index.html
├── src/
│   ├── api.js               ← Real API calls: Claude, ChatGPT, Gemini
│   ├── App.jsx              ← Main app & orchestration
│   ├── constants.js         ← Model config
│   ├── utils.js             ← Scoring logic & prompt builder
│   ├── index.js             ← React entry point
│   └── components/
│       ├── InputCard.jsx
│       ├── ScoreCard.jsx
│       ├── Ring.jsx
│       ├── Pill.jsx
│       ├── ResponseCard.jsx
│       ├── CompetitorChart.jsx
│       └── LoadingState.jsx
├── .env.example             ← Copy → .env, add your keys
├── package.json
└── README.md
```

---

## 📊 Scoring Formula

| Signal             | Points |
|--------------------|--------|
| Product mentioned  | +50    |
| Ranked #1–3        | +30    |
| Ranked #4+         | +10    |
| Positive sentiment | +20    |
| Neutral sentiment  | +8     |
| **Max**            | **100**|

🟢 70+  &nbsp; 🟡 40–69  &nbsp; 🔴 0–39

---

## 💡 Example Inputs

| Product Name  | Query |
|---------------|-------|
| Coca-Cola     | best soft drink for a party |
| Lakme         | best lipstick brand for Indian skin tone |
| Colgate       | best toothpaste for whitening |
| Nike          | best running shoes brand |
| Samsung       | best Android phone under 50000 |

---

## ⚠️ Important Note

This app calls APIs directly from the browser (fine for local development).  
For a **production deployment**, route API calls through a backend server  
so your API keys are never exposed publicly.
