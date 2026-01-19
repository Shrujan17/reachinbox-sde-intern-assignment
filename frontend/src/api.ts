export const API = "http://localhost:5000/api";

export async function getUser() {
  const res = await fetch(`${API}/auth/me`, { credentials: "include" });
  return res.json();
}

export async function getEmails() {
  const res = await fetch(`${API}/emails`, { credentials: "include" });
  return res.json();
}

export async function scheduleEmail(data: any) {
  await fetch(`${API}/schedule-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
}
