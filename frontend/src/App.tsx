import { useEffect, useState } from "react";
import Dashboard from "./components/pages/Dashboard";
import type { User } from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <a href={`${import.meta.env.VITE_API_BASE}/auth/google`}>
        Login with Google
      </a>
    );
  }

  return <Dashboard user={user} />;
}
