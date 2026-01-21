import { User } from "../types";

export default function Header({ user }: { user: User }) {
  return (
    <header className="header">
      <div>
        <strong>{user.displayName}</strong>
        <div>{user.emails[0].value}</div>
      </div>

      <button
        className="btn-secondary"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </header>
  );
}
