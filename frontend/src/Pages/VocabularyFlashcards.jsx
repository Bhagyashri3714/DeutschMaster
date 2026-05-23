import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VocabularyFlashcards = () => {
  const location = useLocation();

  // DETECT LEVEL FROM URL
  const level = location.pathname.includes("/a2") ? "A2" : "A1";

  const [words, setWords] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // FETCH WORDS
  useEffect(() => {
    axios
      .get(`http://localhost:8080/vocabulary/all?level=${level}`)
      .then((res) => {
        // ✅ SAFETY FILTER (prevents A1/A2 mixing)
        const filtered = (res.data || []).filter(
          (word) => word.level === level
        );

        setWords(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [level]);

  // RESET WHEN LEVEL CHANGES
  useEffect(() => {
    setCurrent(0);
    setFlipped(false);
  }, [level]);

  // LOADING / EMPTY STATE
  if (!words.length) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        No Flashcards Available
      </div>
    );
  }

  const word = words[current] || {};

  // NEXT CARD
  const nextCard = () => {
    setFlipped(false);
    setCurrent((prev) => Math.min(prev + 1, words.length - 1));
  };

  // PREVIOUS CARD
  const prevCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "30px", color: "#1e293b" }}>
        📚 Flashcards
      </h1>

      {/* FLASHCARD */}
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          width: "350px",
          minHeight: "250px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px",
          cursor: "pointer",
          textAlign: "center",
          transition: "0.3s",
        }}
      >
        {!flipped ? (
          <div>
            <h2 style={{ color: "#312e81", fontSize: "32px" }}>
              {word.germanWord}
            </h2>

            <p style={{ marginTop: "15px", color: "#64748b" }}>
              Click to Flip
            </p>
          </div>
        ) : (
          <div>
            <h2 style={{ color: "#059669" }}>
              {word.englishMeaning}
            </h2>

            <p style={{ marginTop: "15px" }}>
              📂 {word.category}
            </p>

            <p
              style={{
                marginTop: "20px",
                fontStyle: "italic",
                color: "#374151",
              }}
            >
              💬 {word.example}
            </p>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "15px",
        }}
      >
        <button onClick={prevCard} style={buttonStyle}>
          ⬅ Previous
        </button>

        <button onClick={nextCard} style={buttonStyle}>
          Next ➡
        </button>
      </div>

      {/* COUNT */}
      <p style={{ marginTop: "20px", color: "#64748b" }}>
        Card {current + 1} of {words.length}
      </p>
    </div>
  );
};

const buttonStyle = {
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default VocabularyFlashcards;