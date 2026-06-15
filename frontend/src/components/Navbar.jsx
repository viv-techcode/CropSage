import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "#15803d",
  color: "#ffffff",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
};

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  fontWeight: 600,
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/about">About</Link>
      <Link style={linkStyle} to="/dashboard">Dashboard</Link>
      <Link style={linkStyle} to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;