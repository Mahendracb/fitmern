# 🏋️ FitMERN - Full Stack MERN Fitness Tracking Application

FitMERN is a comprehensive, modern full-stack fitness tracking web application built using the **MERN Stack** (MongoDB, Express.js, React 19, Node.js) and Vite. It empowers users to track their workouts, log daily nutrition, set personal fitness goals, monitor visual progress with interactive analytics, and get smart AI fitness recommendations.

---

## ✨ Features

- 🔒 **User Authentication & Authorization**: Secure JWT-based registration & login with password hashing (`bcryptjs`).
- 💪 **Workout Tracker**: Log exercises, sets, repetitions, duration, and calories burned across various workout types.
- 🥗 **Nutrition Logging**: Track daily meal intake, calories, and macronutrient breakdowns (Protein, Carbs, Fat).
- 🎯 **Fitness Goals**: Set, track, and update fitness targets (weight loss, muscle gain, daily calorie intake, step targets).
- 📊 **Progress Analytics**: Interactive charts powered by `Chart.js` & `react-chartjs-2` to visualize weight trends, workout frequency, and nutritional history over time.
- 🤖 **AI Fitness Assistant**: Integrated AI endpoints for personalized workout tips and nutritional guidance.
- 🎨 **Modern Responsive UI**: Built with React 19, Vite, and Material-UI (MUI) for a clean, mobile-responsive user experience.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 (Vite)
- **UI Library**: Material-UI (MUI v7), `@emotion/styled`
- **Charts & Data Viz**: `chart.js`, `react-chartjs-2`
- **Routing**: `react-router-dom` (v7)
- **HTTP Client**: `axios`
- **Date Formatting**: `date-fns`

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
- **Environment**: `dotenv`, `cors`

---

## 📂 Project Structure

```text
fitmern/
├── backend/
│   ├── controllers/      # Route logic & controllers
│   ├── middleware/       # JWT auth & error handling middleware
│   ├── models/           # Mongoose schemas (User, Workout, Nutrition, Goal, Progress)
│   ├── routes/           # Express API endpoints
│   ├── seed.js           # Database seeding script
│   ├── server.js         # Express server entry point
│   ├── package.json
│   └── .env              # Environment variables (DB URI, JWT secret)
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # UI components & layout (Navbar, ProtectedRoute)
│   │   ├── context/      # React Auth & App context state
│   │   ├── pages/        # Views (Dashboard, Workouts, Nutrition, Goals, Progress)
│   │   ├── App.jsx       # Main App component & routes
│   │   └── main.jsx      # React DOM entry point
│   ├── vite.config.js
│   └── package.json
└── .gitignore            # Git ignore configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster URI)
- [Git](https://git-scm.com/)

---

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Mahendracb/fitmern.git
cd fitmern
```

#### 2. Backend Setup
Navigate into the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fitmern
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```
> The Express API server will run on `http://localhost:5000`.

---

#### 3. Frontend Setup
Open a new terminal window, navigate into the `frontend` folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
> The React web app will run on `http://localhost:5173`.

---

## 📡 API Endpoints Summary

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check endpoint |
| `/api/users/register` | `POST` | Register a new user |
| `/api/users/login` | `POST` | Authenticate user & receive JWT token |
| `/api/users/profile` | `GET` | Fetch authenticated user profile |
| `/api/workouts` | `GET` / `POST` | Retrieve or log workouts |
| `/api/nutrition` | `GET` / `POST` | Retrieve or log daily meal entries |
| `/api/goals` | `GET` / `POST` / `PUT` | Manage fitness goals |
| `/api/progress` | `GET` / `POST` | Fetch analytics data & log measurements |
| `/api/ai/recommend` | `POST` | Generate AI fitness & diet recommendations |

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ *If you find this project helpful, feel free to star the repository!*
