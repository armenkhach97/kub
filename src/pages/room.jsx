import { useEffect, useState } from "react"
import { getProfileAction } from "../actions/authActon"
import { getAccessToken } from "../actions/constant"
import { getRoomActions } from "../actions/roomAction"
import Header from "../components/Header"
import Loading from "../components/Loading"
import AddRoom from "../components/room/AddRoom"
import DeleteRoom from "../components/room/DeleteRoom"

export default function Room() {
  const [room, setRoom] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [addRoom, setAddRoom] = useState(false)
  const [selRoom, setSelRoom] = useState(null)
  const [selDeleteRoom, setSelDeleteRoom] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    if (getAccessToken()) {
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
    getRooms()
  }, [])

  const getRooms = () => {
    getRoomActions(({ data, error }) => {
      setLoading(false)
      if (error) {
        setError(error)
      } else {
        setRoom(data)
      }
    })
  }

  return (
    <>
      <Header />
      <div className="placeholder"></div>
      {addRoom && (
        <AddRoom
          isOpen={addRoom}
          getRooms={getRooms}
          selRoom={selRoom}
          toggleRoom={() => {
            setAddRoom(!addRoom)
          }}
        />
      )}
      {selRoom && <AddRoom isOpen={!!selRoom} toggleRoom={() => setSelRoom(null)} getRooms={getRooms} selRoom={selRoom} />}
      {openDelete && <DeleteRoom isOpen={openDelete} toggleDeleteRoom={() => setOpenDelete(!openDelete)} getRooms={getRooms} selDeleteRoom={selDeleteRoom} />}

      <section id="room">
        <div className="custome-container">
          <div className="text-right add-btn">
            <div className="section-title">
              Rooms
              {/* ניהול חדרים */}
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                setAddRoom(!addRoom)
                setSelRoom(null)
              }}>
              Add
              {/* הוספת חדר */}
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (room && room.length === 0) || error ? (
            <div className="text-center my-6">{error || "No Data"}</div>
          ) : (
            <div className="row">
              {room.map((e, i) => {
                return (
                  <div className="col-lg-3 col-md-6" key={i} style={{paddingBottom:'35px'}}>
                    <div className="room-card">
                      <div className="room-header">
                        <h2 className="room-heading">{e.type} ({e.status})</h2>
                        <div className="d-flex">
                          <button className="edit-btn" onClick={() => setSelRoom(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M18.308 0l-16.87 16.873-1.436 7.127 7.125-1.437 16.872-16.875-5.691-5.688zm-15.751 21.444l.723-3.585 12.239-12.241 2.861 2.862-12.239 12.241-3.584.723zm17.237-14.378l-2.861-2.862 1.377-1.377 2.861 2.861-1.377 1.378z" />
                            </svg>
                          </button>
                          <button
                            className="dlt-btn ml-1"
                            onClick={() => {
                              setSelDeleteRoom(e)
                              setOpenDelete(true)
                            }}
                          >
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" viewBox="0 0 24 24" clipRule="evenodd">
                              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z" />
                            </svg>{" "}
                          </button>
                        </div>
                      </div>

                      <div><span className="data-heading">Room code:</span><span className="data-desc">{e.code}</span></div>
                      <div><span className="data-heading">Room Cost:</span><span className="data-desc">{e.roomCost}</span></div>
                      <div><span className="data-heading">Room Players Num:</span><span className="data-desc">{e.playersNum}</span></div>
                      <div><span className="data-heading">Room Players: </span><span className="data-desc">{e.players.map(e => e + ", ")}</span></div>
                      {e.winner && <div><span className="data-heading">Room Winner: </span><span className="data-desc">{e.winner}</span></div>}

                      {/* <img
                        src={e.image || "https://www.fkointech.com/images/services/WD.webp"}
                        height="100%"
                        width="100%"
                        style={{ maxHeight: 200, objectFit: "contain" }}
                        alt={e.name}
                      /> */}
                      <p className="room-description">{e.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
