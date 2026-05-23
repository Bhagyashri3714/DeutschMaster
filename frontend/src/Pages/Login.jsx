import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/login", form);

      // store JWT + ROLE from backend
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login successful!");

      // redirect based on role
      if (res.data.role === "ROLE_ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
      alert("Invalid username or password");
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

      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        {/* 🔥 REGISTER BUTTON ADDED */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;