import { useState } from "react";
import api from "../api";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ComposeModal({ onClose, onSuccess }: Props) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post("/schedule", {
        subject,
        body,
        // add emails / delay / limits later
      });
      onSuccess(); // ✅ refresh dashboard
      onClose();   // ✅ close modal
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal">
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

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Scheduling..." : "Schedule Email"}
      </button>

      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
