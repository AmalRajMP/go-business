import { Link } from "react-router-dom"

import "./index.css"

const Footer = () => (
  <footer className="footer">
    <Link to="/" className="footer-logo-link">
      <h1 className="footer-logo">Go Business</h1>
    </Link>

    <nav className="footer-links" aria-label="Footer">
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </nav>

    <p className="footer-copy">© 2024 Go Business</p>
  </footer>
)

export default Footer
