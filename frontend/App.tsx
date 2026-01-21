import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

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
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Capture token from redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // Load user
  useEffect(() => {
    const init = async () => {
      try {
        const me = await axios.get(`${API_BASE}/auth/me`);
        if (me.data?.id) {
          setUser(me.data);
          const res = await axios.get(`${API_BASE}/schedule/emails`);
          setEmails(res.data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) return <div className="loading-screen">Loading...</div>;

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

  return (
    <div className="dashboard">
      <h2>Welcome, {user.displayName}</h2>
      <p>Total scheduled emails: {emails.length}</p>
    </div>
  );
}

export default App;
