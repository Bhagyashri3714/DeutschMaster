import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Result from "./Pages/Result";
import VocabularyFlashcards from "./Pages/VocabularyFlashcards";

// A1 Pages
import A1Home from "./A1/A1Home";
import VocabularyA1 from "./A1/Vocabulary";
import GrammarA1 from "./A1/Grammar";
import QuizA1 from "./A1/Quiz";
import AddVocabulary from "./Pages/AddVocabulary";
import AddGrammar from "./Pages/AddGrammar";
import AddQuiz from "./Pages/AddQuiz";

// A2 Pages
import A2Home from "./A2/A2Home";
import VocabularyA2 from "./A2/Vocabulary";
import GrammarA2 from "./A2/Grammar";
import QuizA2 from "./A2/Quiz";

function App() {

  const location = useLocation();

  // Hide navbar on these pages
  const hideNavbarRoutes = ["/", "/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      {/* MAIN CONTENT */}
      <div style={{ minHeight: "80vh" }}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          <Route path="/a1" element={
            <ProtectedRoute><A1Home /></ProtectedRoute>
          } />

          <Route path="/a1/vocabulary" element={
            <ProtectedRoute><VocabularyA1 /></ProtectedRoute>
          } />

          <Route path="/a1/grammar" element={
            <ProtectedRoute><GrammarA1 /></ProtectedRoute>
          } />

          <Route path="/a1/quiz" element={
            <ProtectedRoute><QuizA1 /></ProtectedRoute>
          } />

          <Route path="/a2" element={
            <ProtectedRoute><A2Home /></ProtectedRoute>
          } />

          <Route path="/a2/vocabulary" element={
            <ProtectedRoute><VocabularyA2 /></ProtectedRoute>
          } />

          <Route path="/a2/grammar" element={
            <ProtectedRoute><GrammarA2 /></ProtectedRoute>
          } />

          <Route path="/a2/quiz" element={
            <ProtectedRoute><QuizA2 /></ProtectedRoute>
          } />

          <Route path="/result" element={
            <ProtectedRoute><Result /></ProtectedRoute>
          } />

          <Route path="/a1/flashcards" element={<VocabularyFlashcards />} />
          <Route path="/a2/flashcards" element={<VocabularyFlashcards />} />

          <Route path="/a1/add-vocabulary" element={
            <ProtectedRoute><AddVocabulary /></ProtectedRoute>
          } />

          <Route path="/a1/add-quiz" element={
            <ProtectedRoute><AddQuiz /></ProtectedRoute>
          } />

          <Route path="/a1/add-grammar" element={
            <ProtectedRoute><AddGrammar /></ProtectedRoute>
          } />

        </Routes>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;