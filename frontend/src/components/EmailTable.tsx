import { EmailJob } from "../types";

export default function EmailTable({ data }: { data: EmailJob[] }) {
  if (!data.length) return <p>No emails found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e.id}>
            <td>{e.recipientEmail}</td>
            <td>{e.subject}</td>
            <td>{e.status}</td>
            <td>{e.sentAt || e.scheduledAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
