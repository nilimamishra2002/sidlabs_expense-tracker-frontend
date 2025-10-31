import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./components/Auth/register";
import Login from "./components/Auth/login";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/privateRoute";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16 p-4">
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
