import { useState, useEffect } from "react"; // Removed 'React' as it is unused in newer versions of React
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
const API_BASE = "https://reachinbox-sde-intern-assignment.onrender.com/api";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]); // We will now use this in the UI below
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await axios.get(`${API_BASE}/auth/me`);
        if (authRes.data?.id) {
          setUser(authRes.data);
          // Fetching emails to ensure the 'emails' variable is used
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
        <button onClick={() => window.location.href = `${API_BASE}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.displayName}</h2>
      <p>You have {emails.length} scheduled emails.</p> {/* This line ensures 'emails' is used */}
    </div>
  );
};

export default App;