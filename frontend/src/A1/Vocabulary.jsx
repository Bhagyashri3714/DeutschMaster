import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const VocabularyA1 = () => {

  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");

  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // FETCH ALL WORDS
  const fetchWords = () => {

    axios.get(
      "http://localhost:8080/vocabulary/all?level=A1",
      config
    )
    .then(res => setWords(res.data));

  };

  useEffect(() => {
    fetchWords();
  }, []);

  // DELETE
  const deleteWord = (id) => {

    axios.delete(
      `http://localhost:8080/vocabulary/delete/${id}`,
      config
    )
    .then(() => fetchWords());

  };

  return (

    <div style={{
      padding: "30px",
      background: "#f4f6fb",
      minHeight: "100vh"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>

        <h1 style={{
          color: "#1e293b",
          fontSize: "36px"
        }}>
          📘 A1 Vocabulary
        </h1>

        {/* ADMIN ADD BUTTON */}
        {isAdmin() && (

          <button
            onClick={() => navigate("/a1/add-vocabulary")}
            style={{
              padding: "12px 18px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px"
            }}
          >
            + Add Vocabulary
          </button>

        )}

      </div>

      {/* SEARCH BAR */}
<input
  type="text"
  placeholder="Search German or English word..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "30px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none"
  }}
/>

      {/* VOCAB GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "25px"
      }}>

        {words
  .filter((word) =>

    word.germanWord
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    word.englishMeaning
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    word.category
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  .map((word, index) => (

          <div
            key={word.id}
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "18px",
              boxShadow:
                "0 6px 18px rgba(0,0,0,0.08)",
              transition: "0.3s"
            }}
          >

            {/* WORD */}
            <h2 style={{
              color: "#312e81",
              marginBottom: "15px",
              fontSize: "28px"
            }}>
              {word.germanWord}
            </h2>

            {/* MEANING */}
            <p style={{
              marginBottom: "10px",
              color: "#374151"
            }}>
              <strong>Meaning:</strong>{" "}
              {word.englishMeaning}
            </p>

            {/* CATEGORY */}
            <p style={{
              marginBottom: "18px",
              color: "#374151"
            }}>
              <strong>Category:</strong>{" "}
              {word.category}
            </p>

            {/* SHOW BUTTON */}
            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === index
                    ? null
                    : index
                )
              }
              style={{
                background: "#e0e7ff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                marginBottom: "15px"
              }}
            >
              {openIndex === index
                ? "Hide Example"
                : "Show Example"}
            </button>

            {/* EXAMPLE */}
            {openIndex === index && (

              <div style={{
                background: "#f9fafb",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}>

                <p style={{
                  fontStyle: "italic",
                  color: "#4b5563",
                  lineHeight: "1.6"
                }}>
                  💬 {word.example}
                </p>

              </div>

            )}

            {/* ADMIN CONTROLS */}
            {isAdmin() && (

              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px"
              }}>

                <button
                  onClick={() =>
                    navigate(
                      `/a1/edit-vocabulary/${word.id}`
                    )
                  }
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() =>
                    deleteWord(word.id)
                  }
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  ❌ Delete
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default VocabularyA1;