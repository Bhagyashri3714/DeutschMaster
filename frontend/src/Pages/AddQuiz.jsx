import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none"
};

const AddQuiz = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // GET LEVEL FROM URL
  const queryParams = new URLSearchParams(location.search);
  const levelFromURL = queryParams.get("level") || "A1";

  const [quiz, setQuiz] = useState({

    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    level: levelFromURL

  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // FETCH QUIZ FOR EDIT
  useEffect(() => {

    if (id) {

      axios
        .get(`http://localhost:8080/quiz/${id}`, config)
        .then((res) => {

          setQuiz(res.data);

        })
        .catch((err) => console.log(err));
    }

  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    // UPDATE
    if (id) {

      axios
        .put(
          `http://localhost:8080/quiz/update/${id}`,
          quiz,
          config
        )
        .then(() => {

          alert("Quiz Updated Successfully");

          if (quiz.level === "A1") {
            navigate("/a1/quiz");
          } else {
            navigate("/a2/quiz");
          }

        })
        .catch((err) => console.log(err));
    }

    // ADD
    else {

      axios
        .post(
          "http://localhost:8080/quiz/add",
          quiz,
          config
        )
        .then(() => {

          alert("Quiz Added Successfully");

          if (quiz.level === "A1") {
            navigate("/a1/quiz");
          } else {
            navigate("/a2/quiz");
          }

        })
        .catch((err) => console.log(err));
    }
  };

  return (

    <div style={{
      minHeight: "100vh",
      background: "#f4f6fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          width: "100%",
          maxWidth: "650px",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}
      >

        {/* TITLE */}
        <h1 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1e293b"
        }}>
          {id ? "✏ Edit Quiz" : "➕ Add Quiz"}
        </h1>

        {/* QUESTION */}
        <textarea
          name="question"
          placeholder="Enter Question"
          value={quiz.question}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px"
          }}
          required
        />

        {/* OPTIONS */}
        <input
          type="text"
          name="optionA"
          placeholder="Option A"
          value={quiz.optionA}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="optionB"
          placeholder="Option B"
          value={quiz.optionB}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="optionC"
          placeholder="Option C"
          value={quiz.optionC}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="optionD"
          placeholder="Option D"
          value={quiz.optionD}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* CORRECT ANSWER */}
        <select
          name="correctAnswer"
          value={quiz.correctAnswer}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">
            Select Correct Answer
          </option>

          <option value={quiz.optionA}>
            {quiz.optionA || "Option A"}
          </option>

          <option value={quiz.optionB}>
            {quiz.optionB || "Option B"}
          </option>

          <option value={quiz.optionC}>
            {quiz.optionC || "Option C"}
          </option>

          <option value={quiz.optionD}>
            {quiz.optionD || "Option D"}
          </option>

        </select>

        {/* LEVEL */}
        <select
          name="level"
          value={quiz.level}
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
            padding: "14px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {id ? "Update Quiz" : "Add Quiz"}
        </button>

      </form>

    </div>
  );
};

export default AddQuiz;