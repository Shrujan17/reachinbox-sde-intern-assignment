import { useState } from "react";
import api from "../api";

export default function ComposeModal({ onClose }: { onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [delay, setDelay] = useState(2);
  const [limit, setLimit] = useState(100);

  function handleFile(file: File) {
    file.text().then((text) => {
      const list = text
        .split(/\r?\n|,/)
        .map((e) => e.trim())
        .filter((e) => e.includes("@"));
      setEmails(list);
    });
  }

  async function schedule() {
    await api.post("/schedule", {
      subject,
      body,
      emails,
      startTime,
      delay,
      hourlyLimit: limit,
    });
    onClose();
  }

  return (
    <div className="modal">
      <h3>Compose New Email</h3>

      <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Body" onChange={(e) => setBody(e.target.value)} />

      <input type="file" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
      <div>{emails.length} emails detected</div>

      <input type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
      <input type="number" value={delay} onChange={(e) => setDelay(+e.target.value)} />
      <input type="number" value={limit} onChange={(e) => setLimit(+e.target.value)} />

      <button onClick={schedule}>Schedule</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
