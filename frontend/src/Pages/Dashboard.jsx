import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const styles = {

    container: {
      minHeight: "100vh",
      background: "linear-gradient(to right, #eef2ff, #f8fafc)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    },

    title: {
      fontSize: "42px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "10px"
    },

    subtitle: {
      fontSize: "18px",
      color: "#475569",
      marginBottom: "15px"
    },

    roleText: {
      background: "#e0e7ff",
      color: "#3730a3",
      padding: "10px 18px",
      borderRadius: "10px",
      marginBottom: "40px",
      fontWeight: "bold"
    },

    cardContainer: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      justifyContent: "center"
    },

    card: {
      width: "280px",
      padding: "35px",
      borderRadius: "20px",
      color: "white",
      cursor: "pointer",
      transition: "0.3s",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      textAlign: "center"
    },

    a1Card: {
      background: "linear-gradient(135deg, #4f46e5, #6366f1)"
    },

    a2Card: {
      background: "linear-gradient(135deg, #059669, #10b981)"
    },

    cardTitle: {
      fontSize: "32px",
      marginBottom: "12px"
    },

    cardText: {
      fontSize: "16px",
      lineHeight: "1.6"
    }

  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        German Learning Platform
      </h1>

      <p style={styles.subtitle}>
        Choose your level to continue learning
      </p>

      <div style={styles.roleText}>
        Logged in as: {role}
      </div>

      <div style={styles.cardContainer}>

        {/* A1 CARD */}
        <div
          style={{
            ...styles.card,
            ...styles.a1Card
          }}
          onClick={() => navigate("/a1")}
          onMouseOver={(e) =>
            e.currentTarget.style.transform = "scale(1.05)"
          }
          onMouseOut={(e) =>
            e.currentTarget.style.transform = "scale(1)"
          }
        >

          <h2 style={styles.cardTitle}>
            📘 A1 Level
          </h2>

          <p style={styles.cardText}>
            Beginner Level <br />
            Learn basic German words,
            grammar and conversations.
          </p>

        </div>

        {/* A2 CARD */}
        <div
          style={{
            ...styles.card,
            ...styles.a2Card
          }}
          onClick={() => navigate("/a2")}
          onMouseOver={(e) =>
            e.currentTarget.style.transform = "scale(1.05)"
          }
          onMouseOut={(e) =>
            e.currentTarget.style.transform = "scale(1)"
          }
        >

          <h2 style={styles.cardTitle}>
            📙 A2 Level
          </h2>

          <p style={styles.cardText}>
            Elementary Level <br />
            Improve vocabulary,
            grammar and sentence formation.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;