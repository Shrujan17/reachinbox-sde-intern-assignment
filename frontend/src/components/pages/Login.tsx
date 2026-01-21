export default function Login() {
  return (
    <div className="auth-container">
      <div className="logo-large">📬 ReachInbox</div>
      <p style={{ color: "#9ca3af", marginBottom: 24 }}>
        Login to start your automated outreach
      </p>

      <a
        href={`${import.meta.env.VITE_API_BASE}/auth/google`}
        className="btn-primary"
        style={{ textDecoration: "none" }}
      >
        Continue with Google
      </a>
    </div>
  );
}
