import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const AddVocabulary = () => {

  const [vocabulary, setVocabulary] = useState({
    germanWord: "",
    englishMeaning: "",
    category: "",
    example: "",
    level: "A1"   // ⭐ FIX: default level added
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/vocabulary/${id}`, config)
        .then(res => setVocabulary(res.data))
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setVocabulary({
      ...vocabulary,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios.put(
        `http://localhost:8080/vocabulary/update/${id}`,
        vocabulary,
        config
      ).then(() => {
        alert("Updated Successfully");
        navigate("/a1/vocabulary");
      });

    } else {
      axios.post(
        "http://localhost:8080/vocabulary/add",
        vocabulary,
        config
      ).then(() => {
        alert("Added Successfully");

        setVocabulary({
          germanWord: "",
          englishMeaning: "",
          category: "",
          example: "",
          level: "A1"
        });

        navigate("/a1/vocabulary");
      });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6fb"
    }}>

      <form onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "400px"
        }}>

        <h2 style={{ textAlign: "center" }}>
          {id ? "Edit Vocabulary" : "Add Vocabulary"}
        </h2>

        <input
          name="germanWord"
          value={vocabulary.germanWord}
          onChange={handleChange}
          placeholder="German Word"
          style={inputStyle}
        />

        <input
          name="englishMeaning"
          value={vocabulary.englishMeaning}
          onChange={handleChange}
          placeholder="English Meaning"
          style={inputStyle}
        />

        <input
          name="category"
          value={vocabulary.category}
          onChange={handleChange}
          placeholder="Category"
          style={inputStyle}
        />

        <textarea
          name="example"
          value={vocabulary.example}
          onChange={handleChange}
          placeholder="Example"
          style={{ ...inputStyle, height: "100px" }}
        />

        {/* ⭐ NEW: LEVEL SELECT DROPDOWN */}
        <select
          name="level"
          value={vocabulary.level}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="A1">A1</option>
          <option value="A2">A2</option>
        </select>

        <button style={{
          width: "100%",
          padding: "12px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px"
        }}>
          {id ? "Update" : "Add"}
        </button>

      </form>
    </div>
  );
};

export default AddVocabulary;