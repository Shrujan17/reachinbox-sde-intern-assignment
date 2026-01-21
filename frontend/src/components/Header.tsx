import type { User } from "../types";

export default function Header({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <header className="header">
      <div className="user-info">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <div>
          <div>{user.displayName}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>

      <button onClick={onLogout}>Logout</button>
    </header>
  );
}
