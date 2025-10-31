# 💰 Expense Tracker — Frontend (React + Vite)

This is the frontend client of the MERN Expense Tracker project.
It provides a seamless, responsive interface for managing and visualizing expenses, supporting authentication, filtering, and summaries — all built using modern React and Tailwind practices.

## 🚀 Tech Stack

React.js (Vite) — Lightning-fast frontend build system

Tailwind CSS — Utility-first styling framework

Axios — For secure API requests

React Router DOM — Client-side routing and navigation

Lucide React — Modern icon components

Day.js — Lightweight date management library

React Context API — State management for Authentication and Expenses

## 🧩 Folder Structure
 ┣ src/
 ┃ ┣ api/             # Axios instance and baseURL configuration
 ┃ ┣ components/      # Navbar, Forms, Expense List, Summary Cards, etc.
 ┃ ┣ context/         # Auth and Expense context providers
 ┃ ┣ pages/           # Home, Dashboard, Login, Register
 ┃ ┣ App.jsx          # Main route and layout setup
 ┃ ┗ main.jsx         # React root entry point
 ┣ index.html
 ┣ package.json
 ┗ README.md

## ⚙️ Setup Instructions
1️⃣ Navigate to the Frontend Folder
cd expense-tracker-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the frontend/ directory:

VITE_API_URL=http://localhost:5000/api

4️⃣ Start the Development Server
npm run dev

Core Features
Feature	Description
🧾 Expense CRUD	Add, edit, delete, and view expenses
🔐 User Authentication	Login and Register with JWT support
🕵️‍♀️ Smart Filtering	Filter by category, date range, and search keywords
💹 Expense Insights	Category-wise and monthly summaries
💻 Responsive Design	Works seamlessly across devices
🚪 Secure Logout	Clears token and redirects to home
💡 Clean UI	Gradient styling, modern cards, and smooth transitions
🔐 Authentication Flow

User registers or logs in → JWT token received from backend.

Token is stored in localStorage for session persistence.

Protected pages (Dashboard) check token validity before rendering.

On logout, token and user info are cleared → redirects to Home.

🧩 Context Overview
🔸 Auth Context

Handles login, register, and logout actions.
Stores user info and token in localStorage.

🔸 Expense Context

Manages expense data fetched from backend API.
Supports dynamic filtering:

Category filter

Date range (from and to)

Search keyword (case-insensitive)
