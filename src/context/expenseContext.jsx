import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api.js";
import dayjs from "dayjs";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [allExpenses, setAllExpenses] = useState([]); // full list
  const [expenses, setExpenses] = useState([]); // filtered list
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    from: "",
    to: "",
    search: "",
  });

  // --- Fetch once on login ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      console.warn("No token found, clearing expenses");
      setAllExpenses([]);
      setExpenses([]);
      return;
    }

    console.log("Fetching all expenses for:", JSON.parse(user).email);
    fetchExpenses();
  }, []); // only once when component mounts

  // --- Refilter whenever filters or allExpenses change ---
  useEffect(() => {
    applyLocalFilters();
  }, [filters, allExpenses]);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/expenses"); // fetch all
      const data = res.data.map((e) => ({ ...e, date: new Date(e.date) }));
      setAllExpenses(data);
      setExpenses(data); // show all initially
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || err.message || "Failed to fetch expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Local filtering logic ---
  const applyLocalFilters = () => {
    if (!allExpenses.length) return;

    const f = filters;
    const filtered = allExpenses.filter((e) => {
      const title = e.title?.toLowerCase() || "";
      const category = e.category?.toLowerCase() || "";
      const search = f.search?.trim().toLowerCase() || "";
      const catFilter = f.category?.trim().toLowerCase() || "";

      const matchSearch = !search || title.includes(search);
      const matchCategory = !catFilter || category.includes(catFilter);
      const matchFrom = !f.from || dayjs(e.date).isAfter(dayjs(f.from).subtract(1, "day"));
      const matchTo = !f.to || dayjs(e.date).isBefore(dayjs(f.to).add(1, "day"));

      return matchSearch && matchCategory && matchFrom && matchTo;
    });

    setExpenses(filtered);
  };

  const addExpense = async (payload) => {
    const res = await API.post("/expenses", payload);
    const newExp = { ...res.data, date: new Date(res.data.date) };
    setAllExpenses((prev) => [newExp, ...prev]);
    setExpenses((prev) => [newExp, ...prev]);
    return newExp;
  };

  const updateExpense = async (id, payload) => {
    const res = await API.put(`/expenses/${id}`, payload);
    const updated = { ...res.data, date: new Date(res.data.date) };
    setAllExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    setExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    return updated;
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    setAllExpenses((prev) => prev.filter((e) => e._id !== id));
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  };

  // --- Derived metrics ---
  const totalAmount = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const categorySummary = expenses.reduce((acc, e) => {
    const cat = e.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  const monthlySummary = expenses.reduce((acc, e) => {
    const key = dayjs(e.date).format("YYYY-MM");
    acc[key] = (acc[key] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        allExpenses,
        loading,
        error,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        filters,
        setFilters,
        totalAmount,
        categorySummary,
        monthlySummary,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
