export const API =
  import.meta.env.VITE_API_BASE ||
  "https://reachinbox-sde-intern-assignment.onrender.com/api";

export async function getUser() {
  const res = await fetch(`${API}/auth/me`, {
    credentials: "include",
  });
  return res.json();
}

export async function getEmails() {
  const res = await fetch(`${API}/emails`, {
    credentials: "include",
  });
  return res.json();
}

export async function scheduleEmail(data: {
  to: string;
  subject: string;
  body: string;
  sendAt: string;
}) {
  const res = await fetch(`${API}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to schedule email");
  }

  return res.json();
}
