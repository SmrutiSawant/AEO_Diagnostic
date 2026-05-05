import { scoreColor } from "../utils";

export default function Ring({ score }) {
  const r = 22, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const col = scoreColor(score);
  return (
    <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="#22223a" strokeWidth="4" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={col} strokeWidth="4"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontFamily: "sans-serif", fontSize: 15, fontWeight: 800, color: col
      }}>{score}</div>
    </div>
  );
}
