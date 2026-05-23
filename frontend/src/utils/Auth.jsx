// // utils/auth.js

// // ✅ Get role from localStorage
// export const getRole = () => localStorage.getItem("role");

// // ✅ Role checks
// export const isAdmin = () => {
//   return localStorage.getItem("role") === "ROLE_ADMIN";
// };
// export const isUser = () => getRole() === "ROLE_USER";

// // ✅ Check if logged in
// export const isLoggedIn = () => !!localStorage.getItem("token");

// // ✅ Logout clears token + role
// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
// };


export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const isAdmin = () => {

  const role = localStorage.getItem("role");

  return role === "ADMIN" || role === "ROLE_ADMIN";
};

// ✅ ADD THIS (missing function causing crash)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};