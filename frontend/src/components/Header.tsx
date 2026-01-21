import type { User } from "../types";

export interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">ReachInbox</div>

      <div className="user-profile">
        <div className="user-info">
          <div className="user-name">{user.displayName}</div>
          <div className="user-email">{user.email}</div>
        </div>

        {user.avatar && (
          <img src={user.avatar} className="avatar" />
        )}

        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
