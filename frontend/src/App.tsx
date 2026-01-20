import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data?.id) {
          setUser(authRes.data);
          const emailRes = await axios.get(`${API_BASE}/schedule/emails`);
          setEmails(emailRes.data);
        }
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) return <div className="loading-screen">Loading ReachInbox...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1>📫 ReachInbox</h1>
        <button className="btn-primary" onClick={() => window.location.href=`${API_BASE}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Add your Dashboard UI here */}
      <header className="header">
        <div className="logo">ReachInbox</div>
        <div className="user-info">{user.displayName}</div>
      </header>
      {/* Table to show emails state */}
    </div>
  );
};

export default App;