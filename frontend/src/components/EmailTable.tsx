import type { EmailJob } from "../types";

export default function EmailTable({ emails }: { emails: EmailJob[] }) {
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
            <td>{e.email}</td> {/* ✅ FIX HERE */}
            <td>{e.subject}</td>
            <td>{e.sentAt ?? e.scheduledAt}</td>
            <td>
              <span className={`status-pill status-${e.status}`}>
                {e.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
