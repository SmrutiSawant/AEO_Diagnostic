import Ring from "./Ring";
import Pill from "./Pill";
import { calcScore } from "../utils";

const border = "rgba(120,120,200,0.15)";
const surface = "#12121a";
const text3 = "#5a5a80";

export default function ScoreCard({ model, analysis }) {
  const a = analysis[model.id];
  const score = calcScore(a);
  const sentType =
    a.sentiment === "positive" ? "pos" :
    a.sentiment === "negative" ? "neg" :
    a.sentiment === "neutral"  ? "neu" : "nm";

  return (
    <div style={{
      background: surface,
      border: `1px solid ${score >= 70 ? "rgba(124,106,247,.5)" : border}`,
      borderRadius: 12, padding: "1.25rem"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: model.color }}>{model.label}</span>
        <Pill type={a.mentioned ? "yes" : "no"}>{a.mentioned ? "✓ Found" : "✗ Missing"}</Pill>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Ring score={score} />
        <div>
          <div style={{ fontSize: 11, color: text3, fontFamily: "monospace", marginBottom: 2 }}>Rank</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{a.rank ? `#${a.rank}` : "—"}</div>
          <div style={{ fontSize: 11, color: text3, fontFamily: "monospace", marginBottom: 2 }}>Sentiment</div>
          <Pill type={sentType}>{a.sentiment}</Pill>
        </div>
      </div>
    </div>
  );
}
