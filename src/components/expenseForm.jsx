
import React, { useState } from "react";
import { useExpenses } from "../context/expenseContext";
import dayjs from "dayjs";

export default function ExpenseForm({ onClose, existing }) {
  // existing optional: for edit
  const { addExpense, updateExpense } = useExpenses();
  const initial = existing || { title: "", amount: "", category: "", date: dayjs().format("YYYY-MM-DD") };
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    // simple validation
    if (!form.title || !form.amount || !form.category || !form.date) {
      setErr("All fields required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        date: new Date(form.date),
      };
      if (existing) {
        await updateExpense(existing._id, payload);
      } else {
        await addExpense(payload);
      }
      onClose();
    } catch (error) {
      setErr(error?.response?.data?.error || error.message || "Could not save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {err && <div className="text-rose-300 text-sm bg-rose-900/20 p-2 rounded">{err}</div>}
      <div>
        <label className="text-xs uppercase text-black/50 mb-2 block">Title</label>
        <input name="title" value={form.title} onChange={handle}
          className="w-full rounded-2xl p-3 bg-white/6 text-black border border-white/10 outline-none focus:shadow-[0_6px_30px_rgba(56,189,248,0.12)]"
          placeholder="e.g., Lunch with team" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase text-black/50 mb-2 block">Amount</label>
          <input name="amount" value={form.amount} onChange={handle} type="number"
            className="w-full rounded-2xl p-3 bg-white/6 text-black border border-white/10 outline-none"
            placeholder="250" />
        </div>

        <div>
          <label className="text-xs uppercase text-black/50 mb-2 block">Category</label>
          <input name="category" value={form.category} onChange={handle}
            className="w-full rounded-2xl p-3 bg-white/6 text-black border border-white/10 outline-none"
            placeholder="Food" />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase text-black/50 mb-2 block">Date</label>
        <input name="date" value={form.date} onChange={handle} type="date"
          className="w-full rounded-2xl p-3 bg-white/6 text-black border border-white/10 outline-none" />
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-2xl bg-white/10 text-white">Cancel</button>
        <button type="submit" disabled={loading} className="px-5 py-2 rounded-2xl relative text-white">
          <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-90 filter blur-sm" />
          {existing ? "Save" : loading ? "Saving..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
