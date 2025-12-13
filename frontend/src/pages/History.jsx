import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(`${apiBase}/history`);
        setRecords(res.data || []);
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Analysis History</h2>
        <span className="card-subtitle">Your previously analyzed images</span>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af" }}>Loading history...</p>
      ) : records.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No history available.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {records.map((record, i) => (
            <li
              key={i}
              style={{
                padding: "1rem",
                background: "rgba(15,23,42,0.7)",
                borderRadius: "1rem",
                border: "1px solid rgba(129,140,248,0.4)",
              }}
            >
              <div style={{ fontSize: "0.9rem", color: "#e5e7eb" }}>
                <strong>Image:</strong> {record.fileName || "Unknown"}
              </div>

              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {record.timestamp
                  ? new Date(record.timestamp).toLocaleString()
                  : "No date"}
              </div>

              <hr style={{ borderColor: "rgba(129,140,248,0.2)", margin: "0.6rem 0" }} />

              <strong style={{ color: "#c7d2fe" }}>Labels:</strong>
              {record.labels?.length ? (
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.8rem" }}>
                  {record.labels.map((lbl, j) => (
                    <li key={j}>{lbl.Name} ({lbl.Confidence.toFixed(1)}%)</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  No labels recorded
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
