import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

/**
 * Backend base URL
 */
const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

/**
 * Attach JWT to every request
 */
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1️⃣ Read token from URL (after Google redirect)
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
          localStorage.setItem("token", token);
          window.history.replaceState({}, "", "/");
        }

        // 2️⃣ Fetch logged-in user
        const res = await axios.get(`${API_BASE}/auth/me`);
        setUser(res.data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="auth-container">
        <h2>Loading ReachInbox…</h2>
      </div>
    );
  }

  // 🔐 Not logged in
  if (!user) {
    return (
      <div className="auth-container">
        <h1>📫 ReachInbox</h1>
        <button
          className="btn-primary"
          onClick={() =>
            (window.location.href = `${API_BASE}/auth/google`)
          }
        >
          Continue with Google
        </button>
      </div>
    );
  }

  // ✅ Logged in
  return (
    <div style={{ color: "white", padding: 40 }}>
      <h1>Welcome, {user.displayName}</h1>
      <p>{user.emails?.[0]?.value}</p>

      <button
        className="btn-primary"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
