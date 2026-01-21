import { useEffect, useState } from "react";
import api from "./api";
import type { User } from "./types";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
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
    return <Login />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={() => {
        api.post("/auth/logout", {}, { withCredentials: true }).finally(() =>
          setUser(null)
        );
      }}
    />
  );
}
