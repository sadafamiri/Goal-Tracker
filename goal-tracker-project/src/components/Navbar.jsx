import { NavLink } from "react-router-dom";
const linkClass = ({ isActive }) =>
  "nav-link " + (isActive ? "fw-bold text-primary" : "");

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-light border-bottom">
      <div className="container">
        <span className="navbar-brand fw-bold">Goal Tracker Dashboard</span>

        <div className="navbar-nav">
          <NavLink className={linkClass} to="/"> Dashboard</NavLink>

          <NavLink className={linkClass} to="/Goals">Goals</NavLink>
          <NavLink className={linkClass} to="/Categories">Categories</NavLink>
          <NavLink className={linkClass} to="/Settings">Settings</NavLink>
        </div>
      </div>
    </nav>
  );
}