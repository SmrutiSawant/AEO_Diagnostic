import { useState } from "react";
import { callAllModels, callAnalysis } from "./api";
import { MODELS } from "./constants";
import { calcScore, scoreColor } from "./utils";
import InputCard from "./components/InputCard";
import LoadingState from "./components/LoadingState";
import ScoreCard from "./components/ScoreCard";
import ResponseCard from "./components/ResponseCard";
import CompetitorChart from "./components/CompetitorChart";

const text2 = "#9090b8", text3 = "#5a5a80", accent = "#7c6af7", accent2 = "#a594ff";
const surface = "#12121a", surface3 = "#22223a", border = "rgba(120,120,200,0.15)";

function SectionTitle({ children, style = {} }) {
  return (
    <div style={{ fontSize: 11, fontFamily: "monospace", color: text3,
      textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "1rem", ...style }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: border, margin: "2rem 0" }} />;
}

export default function App() {
  const [product, setProduct] = useState("");
  const [query, setQuery]     = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps]     = useState([]);
  const [error, setError]     = useState("");
  const [results, setResults] = useState(null);

  function addStep(label) { setSteps(p => [...p, { label, done: false }]); }
  function doneLastStep() { setSteps(p => p.map((s, i) => i === p.length - 1 ? { ...s, done: true } : s)); }

  async function run() {
    if (!product.trim() || !query.trim()) { setError("Please fill in both fields."); return; }
    setError(""); setResults(null); setSteps([]); setLoading(true);

    try {
      // ── CALL 1: All 3 model responses in one shot ──
      addStep("Querying ChatGPT, Claude & Gemini…");
      const userPrompt = `What are the ${query}?`;
      const responses = await callAllModels(userPrompt);
      doneLastStep();

      // ── CALL 2: Full analysis ──
      addStep("Analyzing mentions, rankings & building report…");
      const raw = await callAnalysis(product, query, responses);
      doneLastStep();

      addStep("Rendering report card…");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      doneLastStep();

      setResults({ product, query, responses, ...parsed });
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#e8e8f4",
      fontFamily: "sans-serif", padding: "2rem 1.25rem 4rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(124,106,247,.15)", border: "1px solid rgba(124,106,247,.3)",
            color: accent2, fontFamily: "monospace", fontSize: 11,
            letterSpacing: "0.08em", padding: "5px 14px", borderRadius: 100,
            marginBottom: 14, textTransform: "uppercase"
          }}>
            <span style={{ width: 6, height: 6, background: accent, borderRadius: "50%",
              display: "inline-block", animation: "pulse 2s infinite" }} />
            AEO Diagnostic Tool
          </div>
          <h1 style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 800,
            letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.1 }}>
            Optimize for <span style={{ color: accent2 }}>AI Search</span> Engines
          </h1>
          <p style={{ color: text2, fontSize: "0.9rem", fontWeight: 300,
            maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            See how your product ranks across{" "}
            <strong style={{ color: "#10a37f" }}>ChatGPT</strong>,{" "}
            <strong style={{ color: "#7c6af7" }}>Claude</strong> &amp;{" "}
            <strong style={{ color: "#4285f4" }}>Gemini</strong>.
            Get your visibility score and AI-powered recommendations.
          </p>
        </div>

        <InputCard product={product} query={query} onProduct={setProduct}
          onQuery={setQuery} onRun={run} loading={loading} error={error} />

        {loading && <LoadingState steps={steps} />}

        {results && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>

            {/* Query pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(124,106,247,.12)", border: "1px solid rgba(124,106,247,.25)",
              color: accent2, fontFamily: "monospace", fontSize: 13,
              padding: "7px 14px", borderRadius: 100, marginBottom: "2rem"
            }}>
              <span style={{ color: text3, fontSize: 10, textTransform: "uppercase", letterSpacing: ".05em" }}>query</span>
              {results.query}
            </div>

            {/* Score Cards */}
            <SectionTitle>Visibility Score — {results.product}</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "2rem" }}>
              {MODELS.map(m => <ScoreCard key={m.id} model={m} analysis={results.analysis} />)}
            </div>

            {/* Visibility Bars */}
            <SectionTitle>Visibility Overview</SectionTitle>
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12,
              padding: "1.25rem", marginBottom: "2rem" }}>
              {MODELS.map(m => {
                const score = calcScore(results.analysis[m.id]);
                const col = scoreColor(score);
                return (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: text2, width: 70, flexShrink: 0 }}>{m.label}</div>
                    <div style={{ flex: 1, height: 20, background: surface3, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{
                        width: `${score}%`, height: "100%", background: col, borderRadius: 4,
                        display: "flex", alignItems: "center", justifyContent: "flex-end",
                        paddingRight: 8, fontFamily: "monospace", fontSize: 11, color: "#fff", fontWeight: 600
                      }}>{score}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Responses */}
            <SectionTitle>AI Model Responses</SectionTitle>
            {MODELS.map(m => (
              <ResponseCard key={m.id} model={m} analysis={results.analysis} response={results.responses[m.id]} />
            ))}

            {/* Competitors */}
            {results.allCompetitors?.length > 0 && (
              <>
                <Divider />
                <SectionTitle>Competitor Landscape</SectionTitle>
                <CompetitorChart competitors={results.allCompetitors} />
              </>
            )}

            {/* Insights */}
            <Divider />
            <SectionTitle>Strategic Insights</SectionTitle>
            <div style={{
              background: "linear-gradient(135deg,rgba(124,106,247,.08),rgba(91,164,245,.05))",
              border: "1px solid rgba(124,106,247,.25)", borderRadius: 12,
              padding: "1.5rem", marginBottom: "1rem"
            }}>
              <div style={{ fontSize: 20, marginBottom: "0.75rem" }}>🧠</div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: text2 }}>{results.insights}</p>
            </div>

            {/* Improvements */}
            {results.improvements?.length > 0 && (
              <>
                <SectionTitle style={{ marginTop: "1.5rem" }}>How to improve your AEO score</SectionTitle>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "1.5rem" }}>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {results.improvements.map((tip, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.875rem", color: text2, lineHeight: 1.5 }}>
                        <span style={{ color: accent2, fontFamily: "monospace", flexShrink: 0 }}>→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </div>
  );
}
