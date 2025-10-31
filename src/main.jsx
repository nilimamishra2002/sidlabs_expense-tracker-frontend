import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExpenseProvider } from "./context/expenseContext";
import { AuthProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);
