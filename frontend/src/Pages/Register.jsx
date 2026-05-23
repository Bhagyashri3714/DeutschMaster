import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", form);

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <div className="card p-4 shadow">

        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="username"
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-select mb-3"
            value={form.role}
            onChange={handleChange}
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;