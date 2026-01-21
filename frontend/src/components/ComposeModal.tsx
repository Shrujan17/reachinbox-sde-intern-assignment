import { useState } from "react";
import api from "../api";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function ComposeModal({ onClose, onSuccess }: Props) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [delay, setDelay] = useState(60);
  const [hourlyLimit, setHourlyLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📄 Parse CSV / TXT
  const handleFile = async (file: File) => {
    const text = await file.text();
    const extracted = text
      .split(/[\n,;]/)
      .map((e) => e.trim())
      .filter((e) => /\S+@\S+\.\S+/.test(e));

    setEmails(extracted);
  };

  // 🚀 Submit schedule
  const submit = async () => {
    if (!subject || !body || emails.length === 0 || !startTime) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post(
        "/schedule",
        {
          subject,
          body,
          recipients: emails,
          startTime,
          delaySeconds: delay,
          hourlyLimit,
        },
        { withCredentials: true }
      );

      onSuccess(); // refresh list
      onClose();   // close modal
    } catch {
      setError("Failed to schedule emails");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="card" style={{ maxWidth: 520 }}>
        <h3 className="card-title">✉️ Compose New Email</h3>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <div className="compose-form">
          {/* Subject */}
          <div className="form-group">
            <label>Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>

          {/* Body */}
          <div className="form-group">
            <label>Body</label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email body"
            />
          </div>

          {/* File upload */}
          <div className="form-group">
            <label>Email Leads (CSV / TXT)</label>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={(e) =>
                e.target.files && handleFile(e.target.files[0])
              }
            />
            {emails.length > 0 && (
              <small style={{ color: "#9ca3af" }}>
                {emails.length} email(s) detected
              </small>
            )}
          </div>

          {/* Time & limits */}
          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Delay (sec)</label>
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(+e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Hourly Limit</label>
            <input
              type="number"
              value={hourlyLimit}
              onChange={(e) => setHourlyLimit(+e.target.value)}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              className="btn-primary"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Emails"}
            </button>

            <button className="btn-logout" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
