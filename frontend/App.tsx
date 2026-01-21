import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

// Enable cookies for the authentication handshake
axios.defaults.withCredentials = true;

const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
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

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div className="loading-screen">Verifying Session...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1>📫 ReachInbox</h1>
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
        <div className="user-info">{user.displayName}</div>
      </header>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Your Outreach Queue ({emails.length} items)</h3>
          {/* Mapping ensures 'emails' is used so the build passes */}
          {emails.map(email => (
            <div key={email.id} className="email-item">
              {email.recipient} - <span className="status">{email.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;