import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import Cookies from "js-cookie"

import "./index.css"

const Login = () => {
  const token = Cookies.get("jwt_token")

  if (token) {
    return <Navigate to="/" replace />
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const navigate = useNavigate()

  const onSubmitForm = async (event) => {
    event.preventDefault()

    // if (!email || !password) {
    //   setErrorMsg("hello")
    //   return
    // }

    try {
      const userDetails = { email, password }

      const url =
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const responseData = await response.json()
        const token = responseData.data.token
        Cookies.set("jwt_token", token)

        navigate("/")
      } else {
        const responseData = await response.json()
        setErrorMsg(responseData.message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Go Business</h1>
        <p className="login-subtitle">
          Sign in to open your referral dashboard.
        </p>
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="form-input"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="form-input"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="signin-btn">
              Sign in
            </button>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
