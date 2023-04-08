import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getAccessToken } from "../actions/constant"
import { getProfileAction } from "../actions/authActon"

function Home() {
  const token = getAccessToken()
  const [loginUser, setLoginUser] = useState(false)
  const [registerUser, setRegisterUser] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [curUserName, setCurUserName] = useState("")
  const [forgetPass, setForgetPass] = useState(false)
  const toggleLogin = () => {
    setLoginUser(!loginUser)
  }
  const toggleRegister = () => {
    setRegisterUser(!registerUser)
  }
  const toggleForgetPass = () => {
    setForgetPass(!forgetPass)
  }

  useEffect(() => {
    if (token) {
      getProfileAction(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          if (data !== null) {
            setProfile(data)
            localStorage.setItem("u_name", data.userName)
          }
        }
      })
    }

    const curUserNAme = localStorage.getItem("u_name")
    if (curUserNAme) {
      setCurUserName(curUserNAme)
    }
  }, [])

  return (
    <>
      <Header
        u_name={curUserName}
        roomId={roomId}
        setRoomId={setRoomId}
        loginUser={loginUser}
        setLoginUser={setLoginUser}
        registerUser={registerUser}
        setRegisterUser={registerUser}
        forgetPass={forgetPass}
        setForgetPass={setForgetPass}
        toggleLogin={toggleLogin}
        toggleRegister={toggleRegister}
        toggleForgetPass={toggleForgetPass}
        onLogin={(user) => {
          setCurUserName(user.userName)
        }}
      />

      <div id="hero">
        <div className="placeholder" />
        <div className="custome-container">
          <div className="time-table d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="row justify-content-center" style={{ direction: "ltr" }}>
              <div className="text-secondary" style={{ fontSize: 20 }}>Please Login to your account.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
