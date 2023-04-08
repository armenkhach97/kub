import { useEffect, useState } from "react"
import { editUserAction, getUsersActions } from "../actions/userAction"
import AddUser from "../components/auth/AddUser"
import Header from "../components/Header"
import Loading from "../components/Loading"

const User = ({ e, i, getUsers, edit }) => {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(e.status)

  const onSubmit = (user, s) => {
    user.status = s
    if (user._id) {
      setSending(true)
      editUserAction(user, ({ error }) => {
        if (!error) {
          setSending(false)
          getUsers()
        } else {
          setSending(false)
        }
      })
    }
  }

  return (
    <div className="col-lg-3 col-md-6" key={i} style={{paddingBottom:"35px"}}>
      <div className="room-card">
        <div className="room-header">
          <h2 className="room-heading">{e.userName} {"(" + e.accountType + ")"}</h2>
        </div>
        {/* <p className={`mb-0 text-capitalize mt-0 ${e.status === "active" ? "app-badge-active" : "app-badge-inactive"}`}>{e.status === "active" ? "active" : "block"}</p> */}
        {e.email && <div><span className="data-heading">Email:</span><span className="data-desc">{e.email}</span></div>}
        <div><span className="data-heading">Phone:</span><span className="data-desc">{e.phone}</span></div>
        <div><span className="data-heading">Points:</span><span className="data-desc"> {e.points}</span></div>
        <div><span className="data-heading">Status:</span> <span className="data-desc">{e.status}</span></div>
        <div className="d-flex room-btns">
          <button
            className="btn-primary w-auto"
            disabled={sending}
            onClick={() => {
              edit(e)
            }}>edit</button>

          <button
            className="btn-cancel w-auto"
            disabled={sending}
            onClick={() => {
              if (!status || status === "active") {
                setStatus("inactive")
                onSubmit(e, "inactive")
              } else if (status === "inactive") {
                setStatus("active")
                onSubmit(e, "active")
              }
            }}>{sending ? "Updating" : status === "active" ? "Block" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [add, setAdd] = useState(false)
  const [user, setSelUser] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    getUsersActions(({ data, error }) => {
      setLoading(false)
      if (error) {
        setError(error)
      } else {
        data.sort((a, b) => a.userName.localeCompare(b.userName))
        // console.log(data)
        setUsers(data)
      }
    })
  }
  const addFun = () => {
    setAdd(!add)
    setSelUser(null)
  }

  return (
    <>
      {add && <AddUser isOpen={add} toggleRegister={addFun}
        onAdd={() => {
          getUsers()
          addFun()
        }}
        user={user}
      />}

      <Header />
      <div className="placeholder"></div>
      <section id="room">
        <div className="custome-container mt-20">
          <div className="text-right add-btn">
            <div className="section-title">
              Users
              {/* ניהול חדרים */}
            </div>
            <button
              className="btn-primary"
              onClick={addFun}>
              Add
              {/* הוספת חדר */}
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (users && users.length === 0) || error ? (
            <div className="text-center my-6">{error || "No Data"}</div>
          ) : (
            <div className="row">
              {users.map((e, i) => {
                return <User key={i} e={e} i={i} getUsers={getUsers}
                  edit={(u => {
                    setSelUser(u)
                    setAdd(true)
                  })} />
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
