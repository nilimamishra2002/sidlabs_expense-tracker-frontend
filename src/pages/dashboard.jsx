
import React, { useState, useEffect } from "react";
import Summary from "../components/summary";
import ExpenseList from "../components/expenseList";
import ExpenseForm from "../components/expenseForm";
import { useExpenses } from "../context/expenseContext";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
   const [userName, setUserName] = useState("");
  const { expenses } = useExpenses();

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || parsed.username || "User");
    }
  }, []);

  return (
    <div className="flex pt-0 min-h-screen">
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h1 className="text-3xl font-semibold">Dashboard</h1> */}
             <h1 className="text-3xl font-semibold">
              Hi {userName}!
            </h1>
            <p className="text-sm text-white/60 mt-1">Overview of your expenses</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg">
              + Add Expense
            </button>
          </div>
        </div>

        <Summary />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <div className="text-sm text-white/60">{expenses.length} items</div>
          </div>

          <ExpenseList onEditRequested={(item) => { setEditing(item); setIsOpen(true); }} />
        </div>
      </main>

      {/* Modal (Sectioned pattern) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl p-6 bg-white/6 backdrop-blur-md border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-semibold mb-3">{editing ? "Edit Expense" : "Add Expense"}</h3>
            <ExpenseForm existing={editing} onClose={() => { setIsOpen(false); setEditing(null); }} />
          </div>
        </div>
      )}
      
    </div>
    
  );
}
