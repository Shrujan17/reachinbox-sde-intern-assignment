import { useEffect, useState } from "react";
import api from "./api";
import { User } from "./types";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);
        window.history.replaceState({}, "", "/");
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <div className="center">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="center">
        <h1>ReachInbox</h1>
        <button
          className="btn-primary"
          onClick={() =>
            (window.location.href =
              "https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google")
          }
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return <Dashboard user={user} />;
}

export default App;
