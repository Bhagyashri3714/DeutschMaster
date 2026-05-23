import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const GrammarA2 = () => {

  const [grammarList, setGrammarList] = useState([]);
  const [openId, setOpenId] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchGrammar = () => {

    axios.get(
      "http://localhost:8080/grammar/all?level=A2",
      config
    )
    .then(res => {
      setGrammarList(res.data);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchGrammar();
  }, []);

  const deleteGrammar = (id) => {

    if (!window.confirm("Delete this grammar topic?")) return;

    axios.delete(
      `http://localhost:8080/grammar/delete/${id}`,
      config
    )
    .then(() => fetchGrammar())
    .catch(err => console.log(err));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6fb",
      padding: "30px"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>

        <h1 style={{
          color: "#1e293b",
          fontSize: "32px"
        }}>
          📙 German Grammar A2
        </h1>

        {isAdmin() && (
          <button
            onClick={() => navigate("/add-grammar?level=A2")}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            + Add Grammar
          </button>
        )}

      </div>

      <div style={{
        display: "grid",
        gap: "20px"
      }}>

        {grammarList.length === 0 ? (

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            No A2 grammar topics available.
          </div>

        ) : (

          grammarList.map((grammar) => (

            <div
              key={grammar.id}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "22px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
              }}
            >

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>

                <h2>{grammar.title}</h2>

                <button
                  onClick={() =>
                    setOpenId(
                      openId === grammar.id
                        ? null
                        : grammar.id
                    )
                  }
                  style={{
                    border: "none",
                    background: "#e0e7ff",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  {openId === grammar.id
                    ? "Hide"
                    : "View"}
                </button>

              </div>

              {openId === grammar.id && (

                <div style={{
                  marginTop: "20px"
                }}>

                  <h4 style={{ color: "#4f46e5" }}>
                    Explanation
                  </h4>

                  <p style={{
                    lineHeight: "1.8"
                  }}>
                    {grammar.explanation}
                  </p>

                  <h4 style={{
                    color: "#059669",
                    marginTop: "18px"
                  }}>
                    Example
                  </h4>

                  <p style={{
                    background: "#f3f4f6",
                    padding: "14px",
                    borderRadius: "10px",
                    fontStyle: "italic"
                  }}>
                    💬 {grammar.example}
                  </p>

                  {isAdmin() && (

                    <div style={{
                      marginTop: "20px",
                      display: "flex",
                      gap: "12px"
                    }}>

                      <button
                        onClick={() =>
                          navigate(
                            `/edit-grammar/${grammar.id}`
                          )
                        }
                        style={{
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer"
                        }}
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteGrammar(grammar.id)
                        }
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer"
                        }}
                      >
                        ❌ Delete
                      </button>

                    </div>
                  )}

                </div>
              )}

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default GrammarA2;