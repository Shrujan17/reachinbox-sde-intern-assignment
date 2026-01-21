export interface User {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
}

export interface EmailJob {
  id: string;
  recipient: string;
  subject: string;
  status: string;
  scheduledAt: string;
}
