import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAdmin } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const QuizA1 = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const level = "A1";

  useEffect(() => {
    axios
      .get("http://localhost:8080/quiz/all?level=A1")
      .then((res) => {
        setQuestions(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ FIXED LOGIC (A/B/C/D SYSTEM)
  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[current];

    if (!currentQuestion) return;

    const correct = currentQuestion.correctAnswer;

    console.log("Selected:", selectedOption);
    console.log("Correct:", correct);

    const isCorrect = selectedOption === correct;

    setScore((prev) => (isCorrect ? prev + 1 : prev));

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      const finalScore = isCorrect ? score + 1 : score;

      navigate("/result", {
        state: {
          score: finalScore,
          total: questions.length,
          level,
        },
      });
    }
  };

  if (loading) {
    return <div style={center}>Loading Quiz...</div>;
  }

  if (!questions.length) {
    return <div style={center}>No A1 Quiz Available</div>;
  }

  const q = questions[current];

  return (
    <div style={page}>
      <div style={card}>

        <div style={header}>
          <h2>🟢 German Quiz A1</h2>
          <p>
            Question {current + 1} of {questions.length}
          </p>
        </div>

        <div style={questionBox}>
          <h3>{q.question}</h3>
        </div>

        {/* OPTIONS - NOW FIXED */}
        <div style={options}>

          <button onClick={() => handleAnswer("A")} style={btn}>
            A. {q.optionA}
          </button>

          <button onClick={() => handleAnswer("B")} style={btn}>
            B. {q.optionB}
          </button>

          <button onClick={() => handleAnswer("C")} style={btn}>
            C. {q.optionC}
          </button>

          <button onClick={() => handleAnswer("D")} style={btn}>
            D. {q.optionD}
          </button>

        </div>

        {isAdmin() && (
          <div style={adminBox}>
            <button
              onClick={() =>
                navigate(`/a1/edit-quiz/${q.id}`)
              }
            >
              Edit
            </button>
          </div>
        )}

        <div style={scoreBox}>
          Score: {score}
        </div>

      </div>
    </div>
  );
};

/* STYLES */
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
};

const card = {
  width: "700px",
  background: "white",
  padding: "30px",
  borderRadius: "15px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const questionBox = {
  background: "#eef2ff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const options = {
  display: "grid",
  gap: "12px",
};

const btn = {
  padding: "12px",
  textAlign: "left",
  borderRadius: "8px",
  cursor: "pointer",
};

const scoreBox = {
  marginTop: "20px",
  textAlign: "center",
  fontWeight: "bold",
};

const adminBox = {
  marginTop: "20px",
  textAlign: "center",
};

const center = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default QuizA1;