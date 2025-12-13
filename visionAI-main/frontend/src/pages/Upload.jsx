import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");

    const apiBase = import.meta.env.VITE_API_URL;
    if (!apiBase) {
      alert("API URL missing! Add VITE_API_URL in frontend .env");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      // 👉 STEP 1: Upload to backend (uploads to S3)
      await axios.post(`${apiBase}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 👉 STEP 2: Analyze image
      const response = await axios.post(`${apiBase}/api/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const analysis = response.data;

      // 👉 STEP 3: Redirect to results page
      navigate("/result", {
        state: {
          labels: analysis.labels || [],
          fileName: file.name,
          analyzedAt: new Date().toISOString(),
          message: analysis.message || "",
          recordId: analysis.recordId || null,
        },
      });
    } catch (err) {
      console.error("❌ Error analyzing image:", err);
      alert("Failed to analyze image. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Upload and Analyze Image</h2>
        <span className="card-subtitle">
          Choose an image and let VisionAI analyze it
        </span>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />

      <button
        className="btn-primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>
    </section>
  );
}
