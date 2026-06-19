import { Link, useNavigate } from "react-router-dom"

import Cookies from "js-cookie"

import "./index.css"

const Navbar = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" aria-label="Go to dashboard home">
        <h1 className="logo">Go Business</h1>
      </Link>
      <nav className="nav-items" aria-label="Primary">
        <Link to="/" className="home-btn">
          Try for free
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Log out
        </button>
      </nav>
    </nav>
  )
}
export default Navbar
