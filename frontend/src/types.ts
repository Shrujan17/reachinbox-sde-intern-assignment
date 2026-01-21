export interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos?: { value: string }[];
}

export interface EmailJob {
  id: string;
  recipientEmail: string;
  subject: string;
  scheduledAt?: string;
  sentAt?: string;
  status: "scheduled" | "sent" | "failed";
}
