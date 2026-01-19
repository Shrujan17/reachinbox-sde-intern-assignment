import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

// Configure axios for session support
axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:5000/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("scheduled");
  const [leadCount, setLeadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduledAt: "",
    delay: 2,
    hourlyLimit: 200
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
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const emailsFound = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
        setLeadCount(emailsFound ? emailsFound.length : 0);
      };
      reader.readAsText(file);
    }
  };

  const onSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/schedule-email`, formData);
      alert("✅ Email Job Scheduled!");
      const res = await axios.get(`${API_BASE}/emails`);
      setEmails(res.data);
    } catch (err) {
      alert("❌ Error scheduling email.");
    }
  };

  if (loading) return <div className="loading-screen">Loading ReachInbox...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1 className="logo-large">📫 ReachInbox</h1>
        <p>Login to manage your AI-driven cold outreach</p>
        <button className="btn-primary" onClick={() => window.location.href=`${API_BASE}/auth/google`}>
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
          <img src={user.photos?.[0]?.value} className="avatar" alt="User" />
          <button className="btn-logout" onClick={() => window.location.href=`${API_BASE}/auth/logout`}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* LEFT COLUMN: COMPOSE */}
        <div className="card">
          <h3 className="card-title">✍️ Compose New Email</h3>
          <form className="compose-form" onSubmit={onSchedule}>
            <div className="form-group">
              <label>Lead List (CSV/Text)</label>
              <input type="file" accept=".csv,.txt" onChange={handleFileUpload} />
              {leadCount > 0 && <small className="lead-indicator">{leadCount} leads detected</small>}
            </div>
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
              placeholder="Message Body..." 
              value={formData.body} 
              onChange={e => setFormData({...formData, body: e.target.value})} 
              required 
            />
            
            <div className="form-row">
              <div className="form-group">
                <label>Start Time</label>
                <input 
                  type="datetime-local" 
                  value={formData.scheduledAt} 
                  onChange={e => setFormData({...formData, scheduledAt: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Hourly Limit</label>
                <input 
                  type="number" 
                  value={formData.hourlyLimit} 
                  onChange={e => setFormData({...formData, hourlyLimit: parseInt(e.target.value)})} 
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">Schedule Job</button>
          </form>
        </div>

        {/* RIGHT COLUMN: LISTS */}
        <div className="card">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`} 
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled Emails
            </button>
            <button 
              className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`} 
              onClick={() => setActiveTab('sent')}
            >
              Sent Emails
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {emails
                  .filter(em => activeTab === 'sent' ? em.status === 'sent' : em.status !== 'sent')
                  .map(email => (
                    <tr key={email.id}>
                      <td className="font-bold">{email.recipient}</td>
                      <td>{email.subject}</td>
                      <td className="text-right">
                        <span className={`status-pill ${email.status === 'sent' ? 'status-sent' : 'status-pending'}`}>
                          {email.status}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {emails.length === 0 && <div className="empty-state">No emails found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;