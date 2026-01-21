export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}

export interface EmailJob {
  id: string;
  toEmail: string;
  subject: string;
  body: string;
  status: "SCHEDULED" | "SENT" | "FAILED";
  scheduledAt: string;
  sentAt?: string | null;
}
