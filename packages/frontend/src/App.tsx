import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import AppLayout from "./components/Layout/AppLayout";
import SignupForm from "./components/Pages/SignupForm";
import LoginForm from "./components/Pages/LoginForm";
import Home from "./components/Pages/Home";
import Article from "./components/Pages/Article";
import AuthHome from "./components/Pages/AuthHome";

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<AuthHome />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route path="" element={<Home />} />
          <Route path="article/:id" element={<Article />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;