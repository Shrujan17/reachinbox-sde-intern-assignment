import { useEffect, useState } from "react";

type User = {
  id: string;
  displayName: string;
  email: string;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ If token is present in URL (after Google login)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      window.history.replaceState({}, "", "/");
    }

    // 2️⃣ Read token from storage
    const storedToken = localStorage.getItem("auth_token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    // 3️⃣ Decode JWT payload (no backend call needed)
    try {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser({
        id: payload.id,
        displayName: payload.displayName,
        email: payload.emails?.[0]?.value || "",
      });
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("auth_token");
    }

    setLoading(false);
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  // 🔐 Not logged in
  if (!user) {
    if (!API_BASE) {
      return (
        <div style={{ padding: 40 }}>
          <h2>Configuration Error</h2>
          <p>VITE_API_BASE is not defined</p>
        </div>
      );
    }

    return (
      <div style={{ padding: 40 }}>
        <h1>ReachInbox</h1>
        <a href={`${API_BASE}/auth/google`}>
          Login with Google
        </a>
      </div>
    );
  }

  // ✅ Logged in
  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user.displayName}</h1>
      <p>{user.email}</p>

      <button
        onClick={() => {
          localStorage.removeItem("auth_token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}
