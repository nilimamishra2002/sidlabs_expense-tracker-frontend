 Frontend (React + Vite)

```markdown
# 💰 Expense Tracker — Frontend (React + Vite)

This is the **frontend client** of the Expense Tracker web app.  
It provides a clean, responsive UI for users to manage and visualize their expenses with category, date, and search filters.

---

## 🚀 Tech Stack
- **React.js (Vite)** — Fast build tool for modern frontend apps
- **Tailwind CSS** — Modern utility-first styling
- **Axios** — HTTP client for API calls
- **React Router DOM** — Routing and navigation
- **Lucide React** — Modern icon set
- **Day.js** — Lightweight date library for filtering and formatting
- **Context API** — For Auth, Expenses, and Theme state management

---

## 🧩 Folder Structure
┣ src/
┃ ┣ api/ # Axios instance (baseURL)
┃ ┣ components/ # Reusable UI components
┃ ┣ context/ # Auth & Expense providers
┃ ┣ pages/ # Home, Dashboard, Login, Register
┃ ┣ App.jsx
┃ ┗ main.jsx
┣ index.html
┣ package.json
┗ README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to Frontend Folder
```bash
cd expense-tracker/frontend
2️⃣ Install Dependencies
npm install

3️⃣ Configure API URL

Create a .env file inside frontend/ with:

VITE_API_URL=http://localhost:5000/api


Change the URL to your deployed backend when hosted online.

4️⃣ Start the Development Server
npm run dev

Features

✅ User Authentication (Login & Register)
✅ JWT Token Management (stored securely in localStorage)
✅ Add, Edit, Delete Expenses
✅ Filter by Category, Date Range, and Title
✅ Total, Monthly, and Category-wise summaries
✅ Responsive Layout (works on all screen sizes)
✅ Secure Logout (clears token and redirects to Home)

🔐 Authentication Flow

On successful login, JWT token is saved in localStorage.

Protected routes (Dashboard) verify token before loading.

On logout, token is cleared and user is redirected to Home.
