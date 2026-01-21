export type User = {
  id: string;
  displayName: string;
  email: string;
  photo?: string;
};

export type EmailJob = {
  id: string;
  email: string;
  subject: string;
  scheduledAt?: string;
  sentAt?: string;
  status: "scheduled" | "sent" | "failed";
};
