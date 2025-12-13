import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper" style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to VisionAI</h1>
        <p style={styles.subtitle}>Cloud-powered intelligent image analysis</p>

        <p style={styles.description}>
          VisionAI uses advanced cloud recognition technology to detect objects,
          classify scenes, and extract meaningful insights from your images.
          Experience fast, scalable, AI-powered analysis — all within a
          clean and modern interface.
        </p>

        <button style={styles.button} onClick={() => navigate("/upload")}>
          Start Image Analysis
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "80px",
    paddingBottom: "80px",
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "40px 50px",
    width: "70%",
    maxWidth: "900px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  title: {
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "25px",
    color: "#b8b8ff",
  },
  description: {
    fontSize: "1.05rem",
    lineHeight: "1.7",
    color: "#dcdcdc",
    marginBottom: "40px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    padding: "14px 28px",
    background: "#6366f1",
    border: "none",
    color: "white",
    borderRadius: "8px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default Home;
