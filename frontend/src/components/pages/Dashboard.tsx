import { useEffect, useState } from "react";
import type { EmailJob, User } from "../../types";
import api from "../../api";

import Header from "../Header";
import EmailTable from "../EmailTable";
import ComposeModal from "../ComposeModal";

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"scheduled" | "sent">("scheduled");
  const [emails, setEmails] = useState<EmailJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/emails/${tab}`);
      setEmails(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [tab]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <div className="dashboard-grid">
        {/* LEFT – COMPOSE */}
        <div className="card">
          <h3 className="card-title">Compose New Email</h3>

          <button
            className="btn-primary"
            onClick={() => setComposeOpen(true)}
          >
            + Compose Email
          </button>
        </div>

        {/* RIGHT – EMAIL LIST */}
        <div className="card">
          <div className="tabs">
            <button
              className={`tab-btn ${tab === "scheduled" ? "active" : ""}`}
              onClick={() => setTab("scheduled")}
            >
              Scheduled Emails
            </button>

            <button
              className={`tab-btn ${tab === "sent" ? "active" : ""}`}
              onClick={() => setTab("sent")}
            >
              Sent Emails
            </button>
          </div>

          {loading ? (
            <div className="loading-screen">Loading…</div>
          ) : emails.length === 0 ? (
            <div style={{ padding: "30px", color: "#6b7280" }}>
              No emails found.
            </div>
          ) : (
            <EmailTable emails={emails} />
          )}
        </div>
      </div>

      {composeOpen && (
        <ComposeModal
          onClose={() => setComposeOpen(false)}
          onSuccess={fetchEmails}
        />
      )}
    </>
  );
}
