import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

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
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
    }

    axios
      .get(`${API_BASE}/auth/me`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1>📫 ReachInbox</h1>
        <button onClick={() => (window.location.href = `${API_BASE}/auth/google`)}>
          Continue with Google
        </button>
      </div>
    );
  }

  return <h2>Welcome, {user.displayName}</h2>;
}

export default App;
