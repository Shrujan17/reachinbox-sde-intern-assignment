import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("scheduled");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    recipient: "", subject: "", body: "", scheduledAt: ""
  });

  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data && authRes.data.id) {
          setUser(authRes.data);
          const emailRes = await axios.get(`${API_BASE}/emails`);
          setEmails(emailRes.data);
        }
      } catch (err) { console.log("Not logged in"); }
      finally { setLoading(false); }
    };
    init();
  }, []);

  const onSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/schedule`, {
        to: formData.recipient,
        subject: formData.subject,
        body: formData.body,
        sendAt: new Date(formData.scheduledAt).toISOString(),
      });
      alert("✅ Email Job Scheduled!");
    } catch (err) { alert("❌ Error scheduling email."); }
  };

  if (loading) return <div className="loading-screen">Loading ReachInbox...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1 className="logo-large">📫 ReachInbox</h1>
        <button className="btn-primary" onClick={() => window.location.href=`${API_BASE}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header and Grid logic as provided in your earlier dashboard code */}
      <header className="header">
        <div className="logo">📫 ReachInbox</div>
        <div className="user-profile">
          <div className="user-name">{user.displayName}</div>
          <button className="btn-logout" onClick={() => window.location.href=`${API_BASE}/auth/logout`}>Logout</button>
        </div>
      </header>
      <div className="dashboard-grid">
         {/* Insert your Compose Card and List Card here */}
      </div>
    </div>
  );
};

export default App;