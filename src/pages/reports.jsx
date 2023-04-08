import { useEffect, useState } from "react"
import { getRoomActions } from "../actions/roomAction"
import { getUsersActions } from "../actions/userAction"
import Header from "../components/Header"
import Loading from "../components/Loading"
import { DataGridPro as DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid-pro"
import { isMobile } from "react-device-detect"

export default function AllReports() {
  const apiRef = useGridApiRef()
  const [reports, setReports] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])


      useEffect(() => {
    getReports()
    getUsers()
  }, [])

  const getReports = () => {
    getRoomActions(({ data, error }) => {
      setLoading(false)
      if (error) {
        setError(error)
      } else {
        setReports(data)
      }
    })
  }
  const getUsers = () => {
    getUsersActions(({ data, error }) => {
      if (error) {
        setError(error)
      } else {
        data.sort((a, b) => a.userName.localeCompare(b.userName))
        setUsers(data)
      }
    })
  }

  const rows = reports.map((e) => ({
    ...e, id: e._id,
  }))

  let columns = [
    {
      field: "code",
      headerName: "Code",
      sortable: true,
      flex: 1,
      mFlex: 4,
      filterable: true,
      type: "number",
      valueFormatter: ({ value }) => new Intl.NumberFormat('en-US').format(value)
    }
    ,
    {
      field: "roomCost",
      headerName: "Room Cost",
      sortable: true,
      flex: 1,
      mFlex: 11,
      filterable: true,
      type: "number"

    },
    {
      field: "playersNum",
      headerName: "Players Num",
      sortable: false,
      flex: 1,
      mFlex: 11,
      filterable: true,
      type: "number"
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      flex: 1,
      mFlex: 11,
      filterable: true,
      type: "singleSelect",
      valueOptions: ["new", "active", "over", "cancled"]
    },
    {
      field: "createdAt",
      headerName: "Date",
      sortable: true,
      flex: 1,
      mFlex: 15,
      filterable: true,
      type: "date",
      valueFormatter: (params) => params.value.substr(0, 10),
    },

    {
      field: "players",
      headerName: "Players",
      sortable: false,
      filterable: true,
      flex: 6,
      mFlex: 15,
      renderCell: (v) => {
        return <div>
          {v.row.players.map((e) => <span key={e}>
            {`${users.find(u => u.phone == e)?.userName} (${e}), `}
          </span>)}
        </div>
      }
    },
    {
      field: "winner",
      headerName: "Winner",
      sortable: true,
      flex: 2,
      mFlex: 11,
      filterable: true,
      renderCell: (v) => {
        const e = v.row.winner || ""
        if (!e) {
          return "TBD"
        }
        return <div>
          {`${users.find(u => u.phone == e)?.userName} (${e})`}
        </div>
      }
    },
    {
      field: "prize",
      headerName: "Prize",
      sortable: true,
      filterable: true,
      flex: 1,
      mFlex: 15,
      type: "number",
      renderCell: (v) => {
        const cost = parseInt(v.row.roomCost || "0")
        const playerNum = v.row.playersNum || 2
        return <div>{v.row.winnerPoints || (cost * (playerNum))}</div>
      }
    },
    {
      field: "adminFee",
      headerName: "Admin Fee",
      sortable: true,
      filterable: true,
      flex: 1,
      mFlex: 15,
      type: "number",
      valueGetter: (params) => {
        const cost = parseInt(params.row.roomCost || "0");
        const playerNum = params.row.playersNum || 2;
        const total = cost * playerNum;
        return total - (params.row.winnerPoints || total);
      },
      renderCell: (v) => <div>{v.value}</div>,
    },
  ]

  if (isMobile) {
    columns = columns.map(e => {
      if (e.mFlex) {
        e.flex = e.mFlex
      }
      return e
    })
  }

  return (
    <>
      <Header />
      <div className="placeholder"></div>
      <section id="room">
        <div className="custome-container">
          <div className="text-right add-btn">
            <div className="section-title">
              Reports
              {/* ניהול חדרים */}
            </div>
            {/* <div className="d-flex form-group align-items-center users" style={{ gap: 8 }}>
              <span>
                <select className="text-capitalize">
                  <option value="">Select Status</option>
                  {STATUS.map((e, i) => {
                    return (<option className="text-capitalize" value={e} key={i}>
                      {e}
                    </option>
                    )
                  })}
                </select>
              </span>
              <span>
                <select disabled={!users || users.length === 0} className="text-capitalize">
                  <option value="">Select User</option>
                  {users.map((e, i) => {
                    return (<option className="text-capitalize" value={e} key={i}>
                      {e.userName}
                    </option>
                    )
                  })}
                </select>
              </span>
            </div> */}
          </div>
          {loading ? (
            <Loading />
          ) : (room && room.length === 0) || error ? (
            <div className="text-center my-6">{error || "No Data"}</div>
          ) : (<div style={{ height: 700, width: "100%" }}>
            <DataGrid
              apiRef={apiRef}
              onFilterModelChange={(params) => {
                // setFiltered(!filtered)
              }}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection={false}
              disableSelectionOnClick
              rowsPerPageOptions={[20, 50, 100, 200]}
              pagination
              rows={rows}
              columns={columns}
              loading={loading}
            />
          </div>
          )}
        </div>
      </section>
    </>
  )
}
