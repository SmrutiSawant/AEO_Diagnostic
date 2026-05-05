const accent = "#7c6af7";
const accent2 = "#a594ff";
const text3 = "#5a5a80";

export default function LoadingState({ steps }) {
  const currentStep = steps.findLast?.(s => !s.done) || steps[steps.length - 1];
  const isWaiting = currentStep?.label?.toLowerCase().includes("wait");

  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div style={{
        width: 40, height: 40,
        border: `3px solid ${isWaiting ? "rgba(240,168,46,.3)" : "#22223a"}`,
        borderTopColor: isWaiting ? "#f0a82e" : accent,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 1rem"
      }} />
      <h3 style={{
        fontFamily: "sans-serif", fontSize: "1rem", fontWeight: 600,
        marginBottom: ".5rem", color: isWaiting ? "#f0a82e" : "#e8e8f4"
      }}>
        {isWaiting ? "⏳ Rate limit — auto retrying…" : "Querying AI models…"}
      </h3>
      <p style={{ fontFamily: "monospace", color: text3, fontSize: 13, marginBottom: "1rem" }}>
        {isWaiting
          ? "Waiting a moment before next attempt — please don't close the tab"
          : "This may take 30–60 seconds"}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, fontFamily: "monospace",
            color: s.done ? "#2ecc8e" : i === steps.length - 1 ? accent2 : "#5a5a80"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "currentColor", display: "inline-block"
            }} />
            {s.label}
            {s.done && " ✓"}
          </div>
        ))}
      </div>
    </div>
  );
}
