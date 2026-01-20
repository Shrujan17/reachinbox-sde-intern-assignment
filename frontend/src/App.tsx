import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

// 1. Crucial for cross-origin session support
axios.defaults.withCredentials = true;

// 2. Use the live Render URL for production
const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("scheduled");
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduledAt: "",
  });

  // Fetch data function to be reused
  const refreshDashboard = async () => {
    try {
      const emailRes = await axios.get(`${API_BASE}/schedule/emails`);
      setEmails(emailRes.data);
    } catch (err) {
      console.error("Error fetching emails:", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data && authRes.data.id) {
          setUser(authRes.data);
          await refreshDashboard();
        }
      } catch (err) {
        console.log("Session not found, please login.");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const onSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/schedule/schedule`, {
        to: formData.recipient,
        subject: formData.subject,
        body: formData.body,
        sendAt: new Date(formData.scheduledAt).toISOString(),
      });
      alert("✅ Email Job Scheduled!");
      await refreshDashboard();
    } catch (err) {
      alert("❌ Error: Failed to schedule email.");
    }
  };

  if (loading) return <div className="loading-screen">Verifying ReachInbox Session...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1 className="logo-large">📫 ReachInbox</h1>
        <p>Login to start your automated outreach</p>
        <button className="btn-primary" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">📫 ReachInbox</div>
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">{user.displayName}</div>
            <div className="user-email">{user.emails?.[0]?.value}</div>
          </div>
          <button className="btn-logout" onClick={() => window.location.href = `${API_BASE}/auth/logout`}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">✍️ Compose New Email</h3>
          <form className="compose-form" onSubmit={onSchedule}>
            <input 
              placeholder="Recipient Email" 
              value={formData.recipient} 
              onChange={e => setFormData({...formData, recipient: e.target.value})} 
              required 
            />
            <input 
              placeholder="Subject" 
              value={formData.subject} 
              onChange={e => setFormData({...formData, subject: e.target.value})} 
              required 
            />
            <textarea 
              placeholder="Message body" 
              value={formData.body} 
              onChange={e => setFormData({...formData, body: e.target.value})} 
              required 
            />
            <div className="form-group">
              <label>Send At</label>
              <input 
                type="datetime-local" 
                value={formData.scheduledAt} 
                onChange={e => setFormData({...formData, scheduledAt: e.target.value})} 
                required 
              />
            </div>
            <button className="btn-primary" type="submit">Schedule Job</button>
          </form>
        </div>

        <div className="card">
          <div className="tabs">
            <button className={`tab-btn ${activeTab === "scheduled" ? "active" : ""}`} onClick={() => setActiveTab("scheduled")}>Scheduled</button>
            <button className={`tab-btn ${activeTab === "sent" ? "active" : ""}`} onClick={() => setActiveTab("sent")}>Sent</button>
          </div>
          <table>
            <thead>
              <tr><th>Recipient</th><th>Subject</th><th>Status</th></tr>
            </thead>
            <tbody>
              {emails
                .filter(em => activeTab === 'sent' ? em.status === 'sent' : em.status !== 'sent')
                .map(email => (
                  <tr key={email.id}>
                    <td>{email.recipient}</td>
                    <td>{email.subject}</td>
                    <td><span className={`status-pill ${email.status === 'sent' ? 'status-sent' : 'status-pending'}`}>{email.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;