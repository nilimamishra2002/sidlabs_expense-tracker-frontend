import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl bg-white/8 dark:bg-black/20
        border-b border-white/10 dark:border-white/6
        shadow-[0_6px_30px_rgba(8,12,20,0.35)]
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Brand only */}
        <div
          className="
            font-bold text-lg sm:text-xl tracking-wide
            bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400
          "
        >
          Expense Tracker
        </div>

        {/* Right: Logout only when logged in */}
        <div className="flex items-center gap-3">
          {token ? (
            <button
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                         bg-gradient-to-r from-red-400/65 to-pink-400/65
                         text-white font-medium shadow-md hover:brightness-105 transition"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
