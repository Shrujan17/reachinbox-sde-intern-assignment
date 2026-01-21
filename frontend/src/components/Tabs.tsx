export default function Tabs({
  active,
  setActive,
}: {
  active: "scheduled" | "sent";
  setActive: (v: "scheduled" | "sent") => void;
}) {
  return (
    <div className="tabs">
      <button
        className={active === "scheduled" ? "active" : ""}
        onClick={() => setActive("scheduled")}
      >
        Scheduled Emails
      </button>
      <button
        className={active === "sent" ? "active" : ""}
        onClick={() => setActive("sent")}
      >
        Sent Emails
      </button>
    </div>
  );
}
