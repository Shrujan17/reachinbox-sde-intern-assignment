import { useEffect, useState } from "react";
import api from "./api";

type User = {
  id: string;
  displayName: string;
  email: string;
  photo?: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 40, color: "white" }}>
        <h1>ReachInbox</h1>
        <a href={`${import.meta.env.VITE_API_BASE}/auth/google`}>
          Login with Google
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>Welcome, {user.displayName}</h1>
      <p>{user.email}</p>

      <button
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_API_BASE}/auth/logout`;
        }}
      >
        Logout
      </button>
    </div>
  );
}
