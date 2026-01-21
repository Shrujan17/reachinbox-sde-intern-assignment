import { useEffect, useState } from "react";
import api from "../api";
import { EmailJob, User } from "../types";
import Header from "../components/Header";
import EmailTable from "../components/EmailTable";
import ComposeEmail from "./ComposeEmail";

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"scheduled" | "sent">("scheduled");
  const [emails, setEmails] = useState<EmailJob[]>([]);

  useEffect(() => {
    api.get(`/emails/${tab}`).then((res) => setEmails(res.data));
  }, [tab]);

  return (
    <>
      <Header user={user} />

      <div className="tabs">
        <button onClick={() => setTab("scheduled")}>Scheduled</button>
        <button onClick={() => setTab("sent")}>Sent</button>
      </div>

      <ComposeEmail />
      <EmailTable data={emails} />
    </>
  );
}
