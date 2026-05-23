import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, level } = location.state || {
    score: 0,
    total: 0,
    level: "A1",
  };

  const percentage = total
    ? Number(((score / total) * 100).toFixed(1))
    : 0;

  return (
    <div style={container}>
      <div style={card}>

        <h2>{level} Quiz Result</h2>

        <h1>
          {score} / {total}
        </h1>

        <h3>{percentage}%</h3>

        <h3 style={{ color: percentage >= 50 ? "green" : "red" }}>
          {percentage >= 50 ? "Passed 🎉" : "Failed ❌"}
        </h3>

        <button
          onClick={() => navigate(`/${level.toLowerCase()}`)}
          style={btn}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
};

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  textAlign: "center",
  width: "350px",
};

const btn = {
  marginTop: "20px",
  padding: "10px 20px",
  cursor: "pointer",
};

export default Result;