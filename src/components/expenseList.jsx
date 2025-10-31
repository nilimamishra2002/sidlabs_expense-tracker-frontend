// src/components/expenseList.jsx
import React, { useState } from "react";
import { useExpenses } from "../context/expenseContext";
import ExpenseItem from "./expenseItem";
import dayjs from "dayjs";

export default function ExpenseList({ onEditRequested }) {
  const { expenses, loading, error, filters, setFilters } = useExpenses();
  const [localFilter, setLocalFilter] = useState({
    category: filters.category || "",
    from: filters.from || "",
    to: filters.to || "",
    search: filters.search || "",
  });

  const applyFilters = () => {
    setFilters(localFilter);
  };

  const resetFilters = () => {
    setLocalFilter({ category: "", from: "", to: "", search: "" });
    setFilters({ category: "", from: "", to: "", search: "" });
  };

  return (
    <div className="mt-8">
      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <div className="flex gap-3 items-center">
          <input
            placeholder="Search title..."
            value={localFilter.search}
            onChange={(e) => setLocalFilter((p) => ({ ...p, search: e.target.value }))}
            className="px-3 py-2 rounded-2xl bg-white/6 border border-white/10 text-black/90 outline-none"
          />

          <input
            type="date"
            value={localFilter.from}
            onChange={(e) => setLocalFilter((p) => ({ ...p, from: e.target.value }))}
            className="px-3 py-2 rounded-2xl bg-white/6 border border-white/10 text-black/90 outline-none"
          />
          <input
            type="date"
            value={localFilter.to}
            onChange={(e) => setLocalFilter((p) => ({ ...p, to: e.target.value }))}
            className="px-3 py-2 rounded-2xl bg-white/6 border border-white/10 text-black/90 outline-none"
          />

          <input
            placeholder="Category"
            value={localFilter.category}
            onChange={(e) => setLocalFilter((p) => ({ ...p, category: e.target.value }))}
            className="px-3 py-2 rounded-2xl bg-white/6 border border-white/10 text-black/90 outline-none"
          />

          <button onClick={applyFilters} className="px-3 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500">
            Apply
          </button>
          <button onClick={resetFilters} className="px-3 py-2 rounded-2xl bg-white/6 border border-white/10">
            Reset
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading && <div className="text-white/60">Loading...</div>}
        {error && <div className="text-rose-300">{error}</div>}
        {!loading && expenses.length === 0 && <div className="text-white/60">No expenses yet</div>}
        {expenses.map((exp) => (
          <ExpenseItem key={exp._id} expense={exp} onEdit={onEditRequested || (() => {})} />
        ))}
      </div>
    </div>
  );
}
