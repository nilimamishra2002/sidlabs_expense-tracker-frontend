// src/components/summary.jsx
import React from "react";
import { useExpenses } from "../context/expenseContext";
import dayjs from "dayjs";

function SmallCard({ title, value, children }) {
  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#a0f3ff] via-[#6e8bff] to-[#b178f2]">
      <div className="bg-[#0e141c] rounded-2xl p-5">
        <div className="text-sm text-gray-300">{title}</div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className="mt-3 text-xs text-white/60">{children}</div>
      </div>
    </div>
  );
}

export default function Summary() {
  const { totalAmount, categorySummary, monthlySummary } = useExpenses();

  // pick current month
  const currentMonthKey = dayjs().format("YYYY-MM");
  const thisMonth = monthlySummary[currentMonthKey] || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SmallCard title="Total Expenses" value={`₹${Number(totalAmount).toLocaleString()}`}>
        Since the beginning
      </SmallCard>

      <SmallCard title="This Month" value={`₹${Number(thisMonth).toLocaleString()}`}>
        {currentMonthKey}
      </SmallCard>

      <SmallCard title="Top Category" value={`${Object.values(categorySummary).reduce((a,b)=>a+b,0) ? Object.keys(categorySummary).sort((a,b)=>categorySummary[b]-categorySummary[a])[0] : "—"}`}>
        Breakdown available in report
      </SmallCard>
    </div>
  );
}
