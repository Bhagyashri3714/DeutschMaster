import { useNavigate } from "react-router-dom";

function A1Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1>A1 Level</h1>

        <p>Beginner Level - Start your German journey</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            onClick={() => navigate("/a1/vocabulary")}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
              minWidth: "150px",
            }}
          >
            <h2>📘 Vocabulary</h2>
            <p>Learn basic German words</p>
          </div>

          <div
            onClick={() => navigate("/a1/grammar")}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
              minWidth: "150px",
            }}
          >
            <h2>📗 Grammar</h2>
            <p>Understand sentence structure</p>
          </div>

          <div
            onClick={() => navigate("/a1/quiz")}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
              minWidth: "150px",
            }}
          >
            <h2>🧠 Quiz</h2>
            <p>Test your A1 knowledge</p>
          </div>
        </div>

        <div
  onClick={() => navigate("/a1/flashcards")}
  style={{
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  <h2>🔁 Flashcards</h2>
  <p>Learn vocabulary interactively</p>
</div>

        <button onClick={() => navigate("/dashboard")}>
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default A1Home;