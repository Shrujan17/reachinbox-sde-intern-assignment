import { useEffect, useState } from "react";
import api from "../../api";
import type { User, EmailJob } from "../../types";
import Header from "../Header";
import EmailTable from "../EmailTable";
import ComposeModal from "../ComposeModal";

type Props = {
  user: User;
  onLogout: () => void; // ✅ ADD THIS
};

export default function Dashboard({ user, onLogout }: Props) {
  const [emails, setEmails] = useState<EmailJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);

  const fetchEmails = async () => {
    const res = await api.get("/emails", { withCredentials: true });
    setEmails(res.data);
  };

  useEffect(() => {
    fetchEmails().finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header user={user} onLogout={onLogout} />

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">📬 Scheduled Emails</h3>

          <button
            className="btn-primary"
            onClick={() => setComposeOpen(true)}
          >
            Compose New Email
          </button>

          {loading ? (
            <p>Loading…</p>
          ) : emails.length === 0 ? (
            <p>No emails scheduled</p>
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
