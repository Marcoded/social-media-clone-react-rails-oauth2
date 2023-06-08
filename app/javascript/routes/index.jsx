import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import UserPage from "../components/UserPage";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/users/sign_in" element={<></>} />
      <Route path="/users/sign_up" element={<></>} />
    </Routes>
  </Router>
);