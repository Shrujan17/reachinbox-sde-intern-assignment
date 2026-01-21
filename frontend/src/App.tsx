import { useEffect, useState } from "react";
import type { User } from "./types";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
    }

    const stored = localStorage.getItem("token");
    if (!stored) return;

    fetch(`${import.meta.env.VITE_API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${stored}` }
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(() => localStorage.removeItem("token"));
  }, []);

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>ReachInbox</h2>
        <a href={`${import.meta.env.VITE_API_BASE}/auth/google`}>
          Login with Google
        </a>
      </div>
    );
  }

  return <Dashboard user={user} />;
}

export default App;
