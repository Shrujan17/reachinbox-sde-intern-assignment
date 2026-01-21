import type { User } from "../types";

interface Props {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: Props) {
  return (
    <header className="header">
      <div className="logo">ReachInbox</div>

      <div className="user-profile">
        <div className="user-info">
          <div className="user-name">{user.displayName}</div>
          <div className="user-email">{user.email}</div>
        </div>

        <img
          className="avatar"
          src={user.avatar}
          alt="avatar"
        />

        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
