import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import NavBar from "./components/views/NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/favorite" element={<FavoritePage />} />
    </Router>
  );
}

export default App;
