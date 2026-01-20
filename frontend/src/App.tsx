import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_URL;

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]); // kept intentionally
  const [loading, setLoading] = useState(true);

  // 👇 THIS LINE FIXES THE TS6133 ERROR (Option B)
  void emails;

  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduledAt: "",
  });

  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data) {
          setUser(authRes.data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const onSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${API_BASE}/schedule`, {
      to: formData.recipient,
      subject: formData.subject,
      body: formData.body,
      sendAt: new Date(formData.scheduledAt).toISOString(),
    });

    alert("✅ Email scheduled successfully");
  };

  if (loading) return <div className="loading-screen">Loading ReachInbox...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1 className="logo-large">📫 ReachInbox</h1>
        <p>Login to manage your outreach</p>
        <button
          className="btn-primary"
          onClick={() =>
            (window.location.href = `${API_BASE}/auth/google`)
          }
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">📫 ReachInbox</div>
        <button
          className="btn-logout"
          onClick={() =>
            (window.location.href = `${API_BASE}/auth/logout`)
          }
        >
          Logout
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">✍️ Schedule Email</h3>

          <form className="compose-form" onSubmit={onSchedule}>
            <input
              placeholder="Recipient Email"
              value={formData.recipient}
              onChange={(e) =>
                setFormData({ ...formData, recipient: e.target.value })
              }
              required
            />

            <input
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Message Body"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              required
            />

            <input
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) =>
                setFormData({ ...formData, scheduledAt: e.target.value })
              }
              required
            />

            <button type="submit" className="btn-primary">
              Schedule Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
