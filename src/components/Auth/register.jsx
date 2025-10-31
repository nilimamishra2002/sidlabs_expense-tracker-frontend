
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      nav("/login", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white/6 dark:bg-black/30
          border border-white/10 dark:border-white/6
          backdrop-blur-md
          shadow-[0_30px_80px_rgba(8,12,20,0.65)]
          p-9
        "
        style={{ boxShadow: "0 30px 80px rgba(10,12,30,0.62)" }}
      >
        {/* Header */}
        <div className="mb-7 text-center">
          <h1
            className="
              text-2xl md:text-3xl font-semibold tracking-tight
              bg-clip-text text-transparent
              bg-gradient-to-r from-sky-400 to-indigo-400
            "
          >
            Let's get you started
          </h1>
          <p className="mt-2 text-sm text-white/70" style={{ fontWeight: 300 }}>
            Create your expense account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-rose-300 bg-rose-900/20 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Username */}
          <label className="block">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
              Username
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <User size={16} />
              </span>
              <input
                name="name"
                value={form.username}
                onChange={handle}
                type="text"
                required
                placeholder="Your username"
                className="
                  w-full pl-10 pr-3 py-3 rounded-2xl
                  bg-white/6 dark:bg-black/40
                  text-white/90 placeholder:text-white/45
                  border border-white/10 dark:border-white/8
                  outline-none transition-all
                  focus:scale-[1.01]
                  focus:shadow-[0_6px_30px_rgba(56,189,248,0.12),0_2px_8px_rgba(99,102,241,0.08)]
                "
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 30px rgba(2,6,23,0.3)",
                }}
              />
            </div>
          </label>

          {/* Email */}
          <label className="block">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
              Email
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <Mail size={16} />
              </span>
              <input
                name="email"
                value={form.email}
                onChange={handle}
                type="email"
                required
                placeholder="your@email.com"
                className="
                  w-full pl-10 pr-3 py-3 rounded-2xl
                  bg-white/6 dark:bg-black/40
                  text-white/90 placeholder:text-white/45
                  border border-white/10 dark:border-white/8
                  outline-none transition-all
                  focus:scale-[1.01]
                  focus:shadow-[0_6px_30px_rgba(56,189,248,0.12),0_2px_8px_rgba(99,102,241,0.08)]
                "
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 30px rgba(2,6,23,0.3)",
                }}
              />
            </div>
          </label>

          {/* Password */}
          <label className="block">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
              Password
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <Lock size={16} />
              </span>
              <input
                name="password"
                value={form.password}
                onChange={handle}
                type="password"
                required
                placeholder="Create a strong password"
                className="
                  w-full pl-10 pr-3 py-3 rounded-2xl
                  bg-white/6 dark:bg-black/40
                  text-white/90 placeholder:text-white/45
                  border border-white/10 dark:border-white/8
                  outline-none transition-all
                  focus:scale-[1.01]
                  focus:shadow-[0_6px_30px_rgba(56,189,248,0.12),0_2px_8px_rgba(99,102,241,0.08)]
                "
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 30px rgba(2,6,23,0.3)",
                }}
              />
            </div>
          </label>

          {/* CTA */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className={`
                relative overflow-hidden w-full inline-flex items-center justify-center gap-3
                rounded-2xl px-4 py-3 text-sm font-semibold
                text-white transition-transform duration-200
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
              `}
            >
              <span
                aria-hidden
                className="
                  absolute inset-0 -z-10 rounded-2xl
                  bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
                  opacity-90 transform-gpu transition-all duration-500
                "
                style={{ filter: "saturate(1.05) blur(6px)" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {loading ? "Creating..." : "Create account"}
              </span>
            </button>
          </div>

          {/* Meta / Links */}
          <div className="mt-3 flex items-center justify-between text-xs text-white/60">
            <div>Already have an account?</div>
            <button
              type="button"
              onClick={() => nav("/login")}
              className="text-white/90 font-medium hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
