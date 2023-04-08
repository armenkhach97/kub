import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getToken, getUserAccountType, logout } from "../actions/constant"
import ForgotPassword from "./auth/Forgot-Password"
import Login from "./auth/Login"
import Register from "./auth/Register"

export default function Header(props) {
  const { onLogin, loginUser, registerUser, toggleLogin, toggleRegister, toggleForgetPass, forgetPass } = props
  const navigate = useNavigate()
  const token = getToken()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const loc = useLocation()

  return (
    <>
      {loginUser && (
        <Login
          isOpen={loginUser}
          toggleForgetPass={toggleForgetPass}
          openL={loginUser}
          toggleLogin={toggleLogin}
          toggleRegister={toggleRegister}
          onLogin={onLogin}
        />
      )}
      {registerUser || <Register isOpen={registerUser} openL={registerUser} toggleLogin={toggleLogin} toggleRegister={toggleRegister} onLogin={onLogin} />}
      {forgetPass && <ForgotPassword isOpen={forgetPass} openL={forgetPass} toggleForgetPass={toggleForgetPass} />}

      <div className="header">
        <div className="header-border custome-container">
          <div className="d-flex">
            <div className="menu-items">
              <div
                style={{ direction: "ltr" }}
              >
                {getUserAccountType() === "admin" && (
                  <>
                    <Link to="/" className={loc.pathname === "/" ? "active" : ""}>
                      Rooms
                      {/* ניהול חדרים  */}
                    </Link>
                    <Link to="/reports" className={loc.pathname === "/reports" ? "active" : ""}>
                      Reports
                      {/* ניהול חדרים  */}
                    </Link>

                    <Link to="/users" className={loc.pathname === "/users" ? "active" : ""}>
                      Users
                      {/* ניהול משתמשים  */}
                    </Link>
                  </>
                )}

                {token ? (
                  <span onClick={() => {
                    navigate("/")
                    logout()
                  }} className="logout">
                    Logout
                  </span>
                ) : (
                  <span className="logout" onClick={() => toggleLogin()}>
                    {" "}Login
                    {/* כניסה למערכת{" "} */}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="app-title">
            <Link to="/">
              Rummy Admin
              {/* <img src="/images/logo.jpeg" alt="Rummy Admin" height="auto" width="150" /> */}
            </Link>
          </div>
        </div>
      </div>
      <header className="navigation-wrapper" id="header-mobile">
        <div className="navigation-header">
          <div className="d-flex align-items-center">
            {getUserAccountType() === "admin" && (
              <span className="navigation-links">
                <button
                  aria-label="Toggle Mobile Menu Button"
                  className={`mobile-menu ${mobileNavOpen === true ? "open" : ""}`}
                  onClick={() => {
                    setMobileNavOpen(!mobileNavOpen)
                  }}
                >
                  <span className="bar-one" />
                  <span className="bar-two" />
                  <span className="bar-three" />
                </button>
              </span>
            )}
            <h1 className="m-0 navigation-names">
              <Link to="/" className="d-flex align-items-center">
                Rummy Admin
                {/* <img src="/images/logo.jpeg" alt="Rummy Admin" height="50%" width="50%" /> */}
              </Link>
            </h1>
          </div>
          {token ? (
            <div className="d-flex align-items-center"
              onClick={() => {
                navigate("/")
                logout()
              }}>
              <svg fill="#fff" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path d="M24 22h-20v-7h2v5h16v-16h-16v5h-2v-7h20v20zm-13-11v-4l6 5-6 5v-4h-11v-2h11z" />
              </svg>
            </div>
          ) : (
            <div onClick={() => toggleLogin()} className="text-white app-fs-14 app-fw-600">
              Login
            </div>
          )}
        </div>
      </header>
      <nav aria-label="mobile navigation" className={`mobile-nav-wrapper ${mobileNavOpen === true ? "open" : ""}`}>
        {getUserAccountType() === "admin" && (
          <>
            {getUserAccountType() === "admin" && (<>
              <Link to="/" className="mobile-link">
                Rooms
                {/* ניהול כל החדרים */}
              </Link>
              <Link to="/reports" className="mobile-link">
                Reports
                {/* ניהול כל החדרים */}
              </Link>


              <Link to="/users" className="mobile-link">
                Users
                {/* ניהול כל החדרים */}
              </Link>

            </>
            )}
          </>
        )}
      </nav>
    </>
  )
}
