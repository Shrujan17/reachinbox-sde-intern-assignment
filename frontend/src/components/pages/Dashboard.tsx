import { useEffect, useState } from "react";
import api from "../../api";
import type { EmailJob, User } from "../../types";
import Header from "../Header";
import EmailTable from "../EmailTable";

export default function Dashboard({ user }: { user: User }) {
  const [emails, setEmails] = useState<EmailJob[]>([]);
  const [tab, setTab] = useState<"scheduled" | "sent">("scheduled");

  useEffect(() => {
    api.get<EmailJob[]>("/schedule/emails").then((res) => {
      setEmails(res.data);
    });
  }, [tab]);

  return (
    <>
      <Header user={user} />
      <button onClick={() => setTab("scheduled")}>Scheduled</button>
      <button onClick={() => setTab("sent")}>Sent</button>
      <EmailTable emails={emails} />
    </>
  );
}
