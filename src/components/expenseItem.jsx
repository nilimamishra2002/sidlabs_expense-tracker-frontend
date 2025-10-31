// src/components/expenseItem.jsx
import React from "react";
import { useExpenses } from "../context/expenseContext";
import dayjs from "dayjs";
import { Trash2, Edit } from "lucide-react";

export default function ExpenseItem({ expense, onEdit }) {
  const { deleteExpense } = useExpenses();

  const handleDelete = async () => {
    if (!confirm("Delete this expense?")) return;
    try {
      await deleteExpense(expense._id);
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/4 border border-white/6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold truncate">{expense.title}</div>
          <div className="ml-2 text-xs px-2 py-1 rounded-full bg-white/6 text-white/70">{expense.category}</div>
        </div>
        <div className="text-xs text-white/60 mt-1">{dayjs(expense.date).format("DD MMM YYYY")}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">₹{Number(expense.amount).toLocaleString()}</div>
        <button onClick={() => onEdit(expense)} className="p-2 rounded-lg hover:bg-white/6">
          <Edit size={16} />
        </button>
        <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-rose-600/20">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
