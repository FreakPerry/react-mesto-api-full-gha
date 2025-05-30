# 🔐 Mesto Fullstack (React + Express)

**Mesto Fullstack** is a complete fullstack application built with React and Node.js (Express), featuring user registration, login, JWT-based authentication via cookies, and full CRUD for user-generated photo cards. All backend infrastructure (including MongoDB) is fully implemented by me.

---

## 🚀 Live Demo

* 🖥 **Frontend**: [https://react-mesto-api-full-gha-nine.vercel.app](https://react-mesto-api-full-gha-nine.vercel.app)
* 🔧 **Backend API**: [https://react-mesto-api-full-gha.onrender.com](https://react-mesto-api-full-gha.onrender.com)

> ⚠️ Use Incognito mode for a clean session if issues with login occur.

---

## 🎥 Preview

![Login Page](./frontend/src/images/screenshots/login.gif) ![Main Page](./frontend/src/images/screenshots/main.gif)

---

## 🧠 Project Evolution

| Version                                                        | Stack           | Description                                                     |
| -------------------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| [Vanilla JS](https://github.com/FreakPerry/mesto)              | HTML/CSS/JS     | First version — no frameworks, focused on DOM & layout          |
| [React SPA](https://github.com/FreakPerry/mesto-react)         | React           | Refactored using component architecture                         |
| [React + Auth](https://github.com/FreakPerry/react-mesto-auth) | React + JWT     | Added login/registration and protected routes                   |
| **This repo**                                                  | React + Node.js | Fullstack version — Express backend, MongoDB, cookie-based auth |

---

## ✨ Features

* ✅ Full user registration & login system
* ✅ JWT authentication via secure, httpOnly cookies
* ✅ Persistent session and protected routes
* ✅ Full CRUD for photo cards (add, delete, like)
* ✅ Edit profile and avatar
* ✅ Responsive layout
* ✅ Form validation on both client and server
* ✅ Centralized error handling

---

## 🛠 Technologies Used

### Frontend:

* React 18
* React Router DOM
* CSS Modules
* Webpack

### Backend:

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* Cookies (`httpOnly`, `SameSite=None`, `Secure`)
* CORS with credentials
* Celebrate + Joi validation

---

## ⚙️ Getting Started

### 📦 Clone repo

```bash
git clone https://github.com/FreakPerry/react-mesto-api-full-gha.git
cd react-mesto-api-full-gha
```

### ▶️ Frontend setup

```bash
cd frontend
npm install
npm start
```

### 🔧 Backend setup

```bash
cd backend
npm install
npm run start
```

> 📝 **Create `.env` in `backend/` folder**:

```env
PORT=3000
JWT_SECRET=your-secret-key
MONGO_URL=your-mongodb-uri
```

---

## 🗂 Folder Structure

```
react-mesto-api-full-gha/
├── frontend/      # React client
└── backend/       # Express server + API
```

---

## 🧑‍💻 Author

Built by [Елисей Татаренко (FreakPerry)](https://github.com/FreakPerry)

> Telegram: @WLAPDLET

---

