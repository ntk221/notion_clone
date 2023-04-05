import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import AppLayout from "./components/Layout/AppLayout";
import SignupForm from "./components/Pages/SignupForm";
import LoginForm from "./components/Pages/LoginForm";
import DashBoard from "./components/Pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<DashBoard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;