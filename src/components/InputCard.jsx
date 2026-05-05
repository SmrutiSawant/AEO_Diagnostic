const surface = "#12121a";
const surface2 = "#1a1a26";
const border = "rgba(120,120,200,0.15)";
const border2 = "rgba(120,120,200,0.28)";
const text = "#e8e8f4";
const text3 = "#5a5a80";
const accent = "#7c6af7";

export default function InputCard({ product, query, onProduct, onQuery, onRun, loading, error }) {
  const inputStyle = {
    width: "100%", background: surface2, border: `1px solid ${border}`,
    borderRadius: 8, color: text, fontFamily: "sans-serif", fontSize: 14,
    padding: "10px 14px", outline: "none",
  };
  const labelStyle = {
    display: "block", fontSize: 11, fontFamily: "monospace", color: text3,
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8
  };
  const handleKey = (e) => { if (e.key === "Enter") onRun(); };

  return (
    <div style={{ background: surface, border: `1px solid ${border2}`, borderRadius: 12, padding: "1.75rem", marginBottom: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={labelStyle}>Your Product Name</label>
          <input style={inputStyle} placeholder="e.g. Coca-Cola" value={product} onChange={e => onProduct(e.target.value)} onKeyDown={handleKey} />
        </div>
        <div>
          <label style={labelStyle}>Target Keyword / Query</label>
          <input style={inputStyle} placeholder="e.g. best soft drink for a party" value={query} onChange={e => onQuery(e.target.value)} onKeyDown={handleKey} />
        </div>
      </div>
      <button onClick={onRun} disabled={loading} style={{
        width: "100%", background: loading ? "#4a3fa0" : accent,
        border: "none", borderRadius: 8, color: "#fff",
        fontFamily: "sans-serif", fontSize: "0.95rem", fontWeight: 700,
        padding: "0.85rem", cursor: loading ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: loading ? 0.7 : 1,
      }}>
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)",
              borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
              animation: "spin 0.8s linear infinite"
            }} />
            Analyzing…
          </>
        ) : "⚡ Run AI Visibility Diagnostic"}
      </button>
      {error && (
        <div style={{
          background: "rgba(224,92,117,.1)", border: "1px solid rgba(224,92,117,.3)",
          borderRadius: 8, color: "#e05c75", fontSize: "0.85rem",
          padding: "0.75rem 1rem", marginTop: "0.75rem"
        }}>{error}</div>
      )}
    </div>
  );
}
