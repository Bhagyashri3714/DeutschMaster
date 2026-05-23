import React from "react";
import { isLoggedIn, isAdmin, logout } from "../utils/Auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 20px",
      background: "#4f46e5",
      color: "white"
    }}>

      <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        DeutschMaster
      </h3>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        {isLoggedIn() ? (
          <>
            <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
              Dashboard
            </span>

            {/* {isAdmin() && (
              <span onClick={() => navigate("/a1/add-vocabulary")} style={{ cursor: "pointer" }}>
                Add Vocabulary
              </span>
            )} */}

            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Login
            </span>

            <span onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
              Register
            </span>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;