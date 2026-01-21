import { useState } from "react";
import api from "../api";

export default function ComposeEmail() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState("");

  const schedule = async () => {
    await api.post("/schedule-email", {
      subject,
      body,
      recipients: emails.split(",")
    });

    alert("Emails scheduled");
  };

  return (
    <div className="card">
      <h3>Compose New Email</h3>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <textarea
        placeholder="Emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <button className="btn-primary" onClick={schedule}>
        Schedule
      </button>
    </div>
  );
}
