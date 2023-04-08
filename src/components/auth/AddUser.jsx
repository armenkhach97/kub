import { useState } from "react";
import Modal from "react-modal/lib/components/Modal"
import { addUserAction } from "../../actions/authActon";
import { API_CONFIG } from "../../actions/constant";
import { isValidEmail } from "../../utils/commonUtils";
// import { AppContext } from "../../AppContext";

export default function AddUser(props) {
    // const props_ = React.useContext(AppContext)
    const { isOpen, toggleRegister, user = {} } = props
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.userName || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [points, setPoints] = useState(user?.points || 0);
    const [error, setError] = useState('');
    // const [type, setType] = useState("password")

    const handleClick = () => {
        setType(type === "password" ? "text" : "password")
    }


    const register = () => {
        if (!name) {
            setError("Name Required")
            return
        }
        if (!phone) {
            setError("Phone Required")
            return
        }
        //  else if (!isValidEmail(email)) {
        //     setError("Invalid Email")
        //     return
        // }
        // if (!password) {
        //     setError("Password Required")
        //     return
        // } else if (password.length < 6) {
        //     setError("Password must be 6 charcaters")
        //     return
        // }

        setError("")
        setLoading(true)
        addUserAction({ ...user, phone, userName: name, points: points || 0 }, ({ b, data, error }) => {
            setLoading(false)
            if (b) {
                setError("")
                props.onAdd()
                setTimeout(() => {
                    toggleRegister()
                }, 1000);
            } else {
                setError(error)
            }
        })
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleRegister}
            contentLabel="My dialog"
            className="mymodal auth-modal"
            overlayClassName="myoverlay auth-overlay"
            closeTimeoutMS={500}
            ariaHideApp={false}>
            <div className="row">
                <div className="col-lg-12 text-center justify-content-center d-flex flex-column p-0">
                    <div className=" d-flex align-items-center justify-content-between py-2 custom-modal-header mb-4">
                        <div className="text-capitalize m-0 section-title">
                            <p>{user?._id ? "Edit User" : "Add user"}</p>
                        </div>
                        <div
                            className="app-fs-20 app-fw-600 text-right cursor-pointer "
                            onClick={toggleRegister}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="close-btn"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24">
                                <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                            </svg>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-12 p-0">
                            <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                <div className="form-group">
                                    <label className="input">
                                        <span className="input__label">Name
                                            <span className="required ms-1 st-fs-12"> *</span>
                                        </span>
                                        <input className="input__field"
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                    </label>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        <label className="input">
                                            <span className="input__label">phone
                                                <span className="required ms-1 st-fs-12"> *</span>
                                            </span>
                                            <input className="input__field"
                                                type="number"
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        <label className="input">
                                            <span className="input__label">points
                                                <span className="required ms-1 st-fs-12"> *</span>
                                            </span>
                                            <input className="input__field"
                                                type="number"
                                                placeholder="Points"
                                                value={points}
                                                onChange={(e) => {
                                                    setPoints(e.target.value)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                        {/* <span className="password__show" onClick={handleClick}>{type === 'text' ? "hide" : "show"}</span> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 p-0">
                                        {error && <div className="app-fs-14 text-left mb-8  text-danger py-2 rounded">{error}</div>}
                                    </div>
                                    <div className="col-lg-12 p-0 text-center form-group">
                                        <button className="btn-primary mt-3 mb-2 py-2 w-100 form-group"
                                            disabled={loading}
                                            type="button"
                                            onClick={() => { register() }}>{loading ? "Saving" : "Save"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Modal >
    )
}