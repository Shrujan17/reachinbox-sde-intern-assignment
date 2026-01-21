import type { EmailJob } from "../types";

export default function EmailTable({ emails }: { emails: EmailJob[] }) {
  if (!emails.length) return <div>No emails</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Subject</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {emails.map((e) => (
          <tr key={e.id}>
            <td>{e.toEmail}</td>
            <td>{e.subject}</td>
            <td>{e.sentAt ?? e.scheduledAt}</td>
            <td>{e.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
