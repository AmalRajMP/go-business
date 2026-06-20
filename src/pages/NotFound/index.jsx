import { Link } from "react-router-dom"

import "./index.css"

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">404</h1>

    <p className="not-found-description">Page not found</p>

    <Link to="/" className="not-found-link">
      Back to dashboard
    </Link>
  </div>
)

export default NotFound
