export type User = {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
};

export type EmailJob = {
  id: string;
  email: string;
  subject: string;
  status: "pending" | "sent" | "failed";
  scheduledAt: string;
  sentAt?: string;
};
