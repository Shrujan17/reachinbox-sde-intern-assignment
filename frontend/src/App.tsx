import { useEffect, useState } from "react";
import api from "./api";
import Dashboard from "./components/pages/Dashboard";
import type { User } from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null)) // 👈 IMPORTANT
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="logo-large">ReachInbox</div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="logo-large">ReachInbox</div>
        <p>Login to start your automated outreach</p>
        <a
          className="btn-primary"
          href={`${import.meta.env.VITE_API_BASE}/auth/google`}
        >
          Continue with Google
        </a>
      </div>
    );
  }

  return (
  <Dashboard
    user={user}
    onLogout={() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }}
  />
);

}
