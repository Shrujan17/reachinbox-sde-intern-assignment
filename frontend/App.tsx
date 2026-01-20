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

  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data?.id) {
          setUser(authRes.data);
          // Fetching emails ensures the variable is used and build passes
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
        <button className="btn-primary" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">ReachInbox</div>
        <div className="user-info">{user.displayName}</div>
      </header>
      <div className="content">
        <h3>Your Outreach Queue ({emails.length} items)</h3>
        {/* Your table logic here */}
      </div>
    </div>
  );
};

export default App;