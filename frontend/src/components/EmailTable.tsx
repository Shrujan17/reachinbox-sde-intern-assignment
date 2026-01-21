import type { EmailJob } from "../types";

export default function EmailTable({ emails }: { emails: EmailJob[] }) {
  return (
    <table>
      <tbody>
        {emails.map((e) => (
          <tr key={e.id}>
            <td>{e.recipient}</td>
            <td>{e.subject}</td>
            <td>{e.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
