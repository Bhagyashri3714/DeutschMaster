import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const AddGrammar = () => {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const levelFromURL = queryParams.get("level") || "A1";

  const [grammar, setGrammar] = useState({
    title: "",
    explanation: "",
    example: "",
    level: levelFromURL
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // FETCH EXISTING DATA FOR EDIT
  useEffect(() => {

    if (id) {

      axios.get(
        `http://localhost:8080/grammar/${id}`,
        config
      )
      .then(res => {
        setGrammar(res.data);
      })
      .catch(err => console.log(err));
    }

  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setGrammar({
      ...grammar,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    // UPDATE
    if (id) {

      axios.put(
        `http://localhost:8080/grammar/update/${id}`,
        grammar,
        config
      )
      .then(() => {

        alert("Grammar Updated Successfully");

        if (grammar.level === "A1") {
          navigate("/a1/grammar");
        } else {
          navigate("/a2/grammar");
        }

      })
      .catch(err => console.log(err));

    }

    // ADD
    else {

      axios.post(
        "http://localhost:8080/grammar/add",
        grammar,
        config
      )
      .then(() => {

        alert("Grammar Added Successfully");

        if (grammar.level === "A1") {
          navigate("/a1/grammar");
        } else {
          navigate("/a2/grammar");
        }

      })
      .catch(err => console.log(err));
    }
  };

  return (

    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6fb",
      padding: "20px"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          width: "450px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
        }}
      >

        {/* TITLE */}
        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#1e293b"
        }}>
          {id ? "✏ Edit Grammar" : "📚 Add Grammar"}
        </h2>

        {/* TOPIC TITLE */}
        <input
          type="text"
          name="title"
          value={grammar.title}
          onChange={handleChange}
          placeholder="Grammar Topic Title"
          style={inputStyle}
          required
        />

        {/* EXPLANATION */}
        <textarea
          name="explanation"
          value={grammar.explanation}
          onChange={handleChange}
          placeholder="Grammar Explanation"
          style={{
            ...inputStyle,
            height: "140px",
            resize: "none"
          }}
          required
        />

        {/* EXAMPLE */}
        <textarea
          name="example"
          value={grammar.example}
          onChange={handleChange}
          placeholder="Example Sentence"
          style={{
            ...inputStyle,
            height: "100px",
            resize: "none"
          }}
          required
        />

        {/* LEVEL */}
        <select
          name="level"
          value={grammar.level}
          onChange={handleChange}
          style={inputStyle}
        >

          <option value="A1">A1</option>

          <option value="A2">A2</option>

        </select>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {id ? "Update Grammar" : "Add Grammar"}
        </button>

      </form>

    </div>
  );
};

export default AddGrammar;