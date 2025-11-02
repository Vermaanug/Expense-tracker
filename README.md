# 💰 Expense Tracker — Full Stack App

A simple and efficient **Expense Tracker** built with **React + TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend.


## 🚀 Installation

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   ```

4. **Start backend server**
   ```bash
   npm run dev
   ```

   The backend server will run at `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variable**
   
   Create a `.env` file in the `frontend` root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start frontend**
   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:5173` (default Vite port)

---
