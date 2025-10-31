import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  //  Whenever `user` changes (from context), update isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]); // <— key change: re-check when user updates

  //  Optional: keep listening for storage updates (cross-tab sync)
  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 text-transparent bg-clip-text mb-4">
            Manage Your Finances Like a Top 1% Developer
          </h1>

          {isLoggedIn ? (
            <>
              <p className="text-white/70 text-lg mb-6">
                Welcome back,{" "}
                <span className="text-fuchsia-400 font-semibold">
                  {user?.name || "User"}
                </span>{" "}
                👋 Ready to track your next goal?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-white/70 text-lg">
                Track expenses, analyze insights, and take control of your
                spending — all in one sleek dashboard.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:bg-white/10 transition"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-500/40 transition">
            <h3 className="text-xl font-semibold text-fuchsia-400 mb-2">
              💰 Smart Expense Tracking
            </h3>
            <p className="text-white/70 text-sm">
              Log every expense instantly with an elegant interface designed for
              focus and clarity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-violet-500/40 transition">
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              📊 Meaningful Analytics
            </h3>
            <p className="text-white/70 text-sm">
              Gain insights through smart charts and summaries that show where
              your money really goes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-pink-500/40 transition">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              ☁️ Sync & Access Anywhere
            </h3>
            <p className="text-white/70 text-sm">
              Securely access your data anytime — your finances follow you
              wherever you go.
            </p>
          </div>
        </div>
      </main>
      <footer className="mt-16 text-sm text-white/40">
        © {new Date().getFullYear()} Expense Tracker — Designed for ambitious
        minds.
      </footer>
    </div>
  );
}
