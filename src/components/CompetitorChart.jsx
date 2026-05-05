import { MODELS } from "../constants";

const border = "rgba(120,120,200,0.15)";
const surface = "#12121a";
const surface3 = "#22223a";
const accent = "#7c6af7";
const text3 = "#5a5a80";

export default function CompetitorChart({ competitors }) {
  if (!competitors?.length) return null;
  const maxM = Math.max(...competitors.map(c => c.mentions), 1);

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "1.25rem" }}>
      {competitors.slice(0, 6).map((c, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
          borderBottom: i < Math.min(competitors.length, 6) - 1 ? `1px solid ${border}` : "none"
        }}>
          <div style={{ flex: 1, fontSize: "0.9rem", fontWeight: 500 }}>{c.name}</div>
          <div style={{ flex: 2, height: 6, background: surface3, borderRadius: 100, overflow: "hidden" }}>
            <div style={{ width: `${Math.round((c.mentions / maxM) * 100)}%`, height: "100%", background: accent, borderRadius: 100 }} />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: text3, minWidth: 60, textAlign: "right" }}>
            {c.mentions}/{MODELS.length} models
          </div>
        </div>
      ))}
    </div>
  );
}
