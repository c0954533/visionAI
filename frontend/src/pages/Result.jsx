import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !Array.isArray(state.labels)) {
    return (
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">No analysis data</h2>
          <span className="card-subtitle">
            Upload an image first to view results
          </span>
        </div>

        <button className="btn-primary" onClick={() => navigate("/upload")}>
          Go to Upload
        </button>
      </section>
    );
  }

  const { labels, fileName, analyzedAt, recordId, message } = state;

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Analysis Result</h2>
        <span className="card-subtitle">
          {fileName || "Image"} •{" "}
          {analyzedAt ? new Date(analyzedAt).toLocaleString() : ""}
        </span>
      </div>

      {message ? <p className="muted">{message}</p> : null}
      {recordId ? (
        <p className="muted" style={{ marginTop: "0.4rem" }}>
          Record ID: <span style={{ color: "#c7d2fe" }}>{recordId}</span>
        </p>
      ) : null}

      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#e5e7eb" }}>
          Detected Labels
        </h3>

        {labels.length === 0 ? (
          <p className="muted">No labels detected.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "0.6rem",
            }}
          >
            {labels.map((lbl, i) => (
              <li
                key={`${lbl?.Name || "label"}-${i}`}
                style={{
                  padding: "0.7rem 0.8rem",
                  borderRadius: "0.9rem",
                  background: "rgba(2,6,23,0.35)",
                  border: "1px solid rgba(129,140,248,0.35)",
                }}
              >
                <div style={{ fontWeight: 700, color: "#e5e7eb" }}>
                  {lbl?.Name || "Unknown"}
                </div>
                <div className="muted">
                  Confidence:{" "}
                  {typeof lbl?.Confidence === "number"
                    ? `${lbl.Confidence.toFixed(1)}%`
                    : "N/A"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => navigate("/upload")}>
          Analyze Another Image
        </button>
        <button className="btn-secondary" onClick={() => navigate("/history")}>
          View History
        </button>
      </div>
    </section>
  );
}
