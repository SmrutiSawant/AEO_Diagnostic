const STYLES = {
  yes: { background: "rgba(46,204,142,.12)",  color: "#2ecc8e" },
  no:  { background: "rgba(224,92,117,.12)",  color: "#e05c75" },
  pos: { background: "rgba(46,204,142,.12)",  color: "#2ecc8e" },
  neu: { background: "rgba(240,168,46,.12)",  color: "#f0a82e" },
  neg: { background: "rgba(224,92,117,.12)",  color: "#e05c75" },
  nm:  { background: "#22223a",               color: "#5a5a80" },
};

export default function Pill({ children, type }) {
  const s = STYLES[type] || STYLES.nm;
  return (
    <span style={{
      ...s, fontSize: 11, padding: "3px 9px",
      borderRadius: 100, fontWeight: 600, display: "inline-block"
    }}>
      {children}
    </span>
  );
}
