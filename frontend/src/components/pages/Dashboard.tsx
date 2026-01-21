import { useEffect, useState } from "react";
import api from "../../api";
import type { EmailJob, User } from "../../types";
import Header from "../Header";
import Tabs from "../Tabs";
import EmailTable from "../EmailTable";
import ComposeModal from "../ComposeModal";

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"scheduled" | "sent">("scheduled");
  const [emails, setEmails] = useState<EmailJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [compose, setCompose] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/emails/${tab}`)
      .then((res) => setEmails(res.data))
      .finally(() => setLoading(false));
  }, [tab]);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <div style={{ padding: 20 }}>
        <button onClick={() => setCompose(true)}>
          Compose New Email
        </button>

        <Tabs active={tab} setActive={setTab} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <EmailTable emails={emails} />
        )}
      </div>

      {compose && <ComposeModal onClose={() => setCompose(false)} />}
    </>
  );
}
