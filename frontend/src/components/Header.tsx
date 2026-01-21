import type { User } from "../types";

export default function Header({ user }: { user: User }) {
  return (
    <header>
      <strong>{user.displayName}</strong>
      <button
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
