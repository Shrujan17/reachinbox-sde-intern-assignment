import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
const API = import.meta.env.VITE_API_URL;

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [emails] = useState<any[]>([]); // kept for future
  void emails; // ✅ fixes TS6133
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduledAt: "",
  });

  useEffect(() => {
    axios.get(`${API}/auth/me`)
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${API}/schedule`, {
      to: form.recipient,
      subject: form.subject,
      body: form.body,
      sendAt: new Date(form.scheduledAt).toISOString(),
    });

    alert("✅ Email Scheduled");
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <h1>📫 ReachInbox</h1>
        <button onClick={() => window.location.href = `${API}/auth/google`}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <form className="compose-form" onSubmit={submit}>
      <input placeholder="To" onChange={e => setForm({...form, recipient: e.target.value})} required />
      <input placeholder="Subject" onChange={e => setForm({...form, subject: e.target.value})} required />
      <textarea placeholder="Body" onChange={e => setForm({...form, body: e.target.value})} required />
      <input type="datetime-local" onChange={e => setForm({...form, scheduledAt: e.target.value})} required />
      <button type="submit">Schedule</button>
    </form>
  );
};

export default App;
