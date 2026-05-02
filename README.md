# 🍔 **CampusBite – Secure Food Ordering Platform**

**CampusBite** is a full-stack food ordering web application designed for campus ecosystems. Built with a modern architecture, it ensures **secure transactions, efficient order handling, and seamless user experience** similar to platforms like Swiggy and Zomato.

---

## 📋 **Table of Contents**

* Project Overview
* Architecture & Tech Stack
* Security Implementation 🔐
* Project Structure
* API Documentation
* Setup & Installation
* Deployment Guide
* Features & Functionality
* Performance Optimizations

---

## 🎯 **Project Overview**

CampusBite provides a complete food ordering ecosystem:

### 🔹 Core Modules:

1. **Frontend (User Interface)** – React-based dynamic UI
2. **Backend API** – Secure REST API (Node.js + Express)
3. **Database** – MySQL with optimized queries

---

## 🏗️ **Architecture & Tech Stack**

### 🎨 Frontend:

* React.js (Vite)
* Tailwind CSS
* Axios
* Context API

### ⚙️ Backend:

* Node.js
* Express.js
* JWT Authentication
* dotenv

### 🗄️ Database:

* MySQL (mysql2 connection pooling)

### ☁️ Deployment:

* Frontend: Vercel
* Backend: Render
* Database: MySQL (Railway / PlanetScale)

---

## 🔐 **Security Implementation (🔥 Highlight Section)**

CampusBite is designed with **production-level security practices**:

### 🛡️ Authentication & Authorization

* JWT-based authentication
* Token verification middleware
* Protected API routes
* User session validation

### 🔒 Data Protection

* Environment variables (`.env`) for secrets
* Password hashing (bcrypt)
* Secure API endpoints

### 🚫 API Security

* Input validation & sanitization
* Prevents SQL Injection (parameterized queries)
* Proper HTTP status handling

### 🌐 Network Security

* CORS configuration for controlled access
* HTTPS-ready deployment

### 💳 Payment Security

* Razorpay integration with secure key handling
* No sensitive data stored on client side

---

## 📂 **Project Structure**

```bash
CampusBite/
│
├── backend/
│   ├── config/              # DB & environment setup
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth & validation
│   ├── db.js                # MySQL connection
│   └── server.js            # Main server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
│   └── App.jsx
│
└── README.md
```

---

## 🔧 **Backend Implementation Highlights**

### ✅ Database Connection (MySQL Pool)

```javascript
import mysql from "mysql2/promise";

const pool = mysql.createPool(process.env.MYSQL_URL);
export default pool;
```

### ✅ Secure Middleware

```javascript
// JWT verification
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // validate token securely
};
```

---

## 📚 **API Documentation**

### 🔐 Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

### 🍽️ Menu

```
GET /api/menu/:restaurantId
```

### 🛒 Cart

```
POST /api/cart/add
GET /api/cart/:userId
```

### 📦 Orders

```
POST /api/orders
GET /api/orders/:userId
```

---

## ⚙️ **Setup & Installation**

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/campusbite.git
cd campusbite
```

---

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MYSQL_URL=your_mysql_connection_url
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

Run server:

```bash
npm start
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 **Deployment Guide**

### Backend (Render)

* Add `MYSQL_URL` in environment variables
* Enable auto deploy

### Frontend (Vercel)

* Connect GitHub repo
* Add API base URL

### Database

* MySQL (Railway / PlanetScale)

---

## ✨ **Features & Functionality**

### 👤 User Features

* 🔐 Secure login & registration
* 🍔 Browse restaurants & menu
* 🛒 Add to cart
* 📦 Order placement & tracking
* 💳 Online payments

### ⚙️ System Features

* ⚡ Fast API response (pooling)
* 🔁 Optimized state management
* 📊 Order history dashboard
* 📱 Responsive UI

---

## 📊 **Performance Optimizations**

* ⚡ MySQL connection pooling
* 🔁 Reduced duplicate API calls
* ⏳ Loading states (no blank UI)
* 📦 Efficient query execution
* 🚀 Fast frontend rendering (Vite)

---

## 🧠 **Future Enhancements**

* 🔔 Real-time tracking (WebSockets)
* 🧑‍🍳 Admin dashboard
* ⭐ Ratings & reviews
* 🤖 AI-based recommendations

---

## 👨‍💻 **Author**

**Anil Kumar Paital**
📧 [anilkumarpaital1@gmail.com](mailto:anilkumarpaital1@gmail.com)

---

## ⭐ **Support**

If you like this project:

* ⭐ Star this repo
* 🍴 Fork it
* 🚀 Use it in your portfolio

---

## 📄 License

MIT License

---
