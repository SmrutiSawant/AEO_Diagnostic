import { useState } from "react";
import Pill from "./Pill";

const border = "rgba(120,120,200,0.15)";
const surface = "#12121a";
const surface2 = "#1a1a26";
const text2 = "#9090b8";
const text3 = "#5a5a80";

export default function ResponseCard({ model, analysis, response }) {
  const [open, setOpen] = useState(false);
  const a = analysis[model.id];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, marginBottom: "0.75rem", overflow: "hidden" }}>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.9rem 1.25rem", cursor: "pointer",
        borderBottom: open ? `1px solid ${border}` : "1px solid transparent"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: model.color, display: "inline-block" }} />
          <span style={{ fontWeight: 500 }}>{model.label}</span>
          <Pill type={a.mentioned ? "yes" : "no"}>
            {a.mentioned ? `Rank #${a.rank || "?"}` : "Not mentioned"}
          </Pill>
        </div>
        <span style={{ color: text3, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{
          padding: "1.25rem", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7,
          color: text2, whiteSpace: "pre-wrap", background: surface2,
          maxHeight: 300, overflowY: "auto"
        }}>
          {response}
        </div>
      )}
    </div>
  );
}
