import { useState } from "react";
import Modal from "react-modal/lib/components/Modal"
import { registerAction } from "../../actions/authActon";
import { API_CONFIG } from "../../actions/constant";
import { isValidEmail } from "../../utils/commonUtils";
// import { AppContext } from "../../AppContext";

export default function Register(props) {
    // const props_ = React.useContext(AppContext)
    const { isOpen, toggleRegister, toggleLogin } = props
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [type, setType] = useState("password")

    const handleClick = () => {
        setType(type === "password" ? "text" : "password")
    }


    const register = () => {
        if (!name) {
            setError("Name Required")
            return
        }
        if (!email) {
            setError("Email Required")
            return
        } else if (!isValidEmail(email)) {
            setError("Invalid Email")
            return
        }
        if (!password) {
            setError("Password Required")
            return
        } else if (password.length < 6) {
            setError("Password must be 6 charcaters")
            return
        }

        setError("")

        registerAction({ email, password, userName: name, status: "active", accountType: "admin" }, ({ b, data, error }) => {
            setLoading(false)
            if (b) {
                setError("")
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("u_email", data.email)
                    localStorage.setItem("u_name", data.name)
                    localStorage.setItem("u_status", data.status || "inactive")
                    localStorage.setItem("u_accountType", data.accountType || "user")
                    localStorage.setItem("uid", data._id)
                    setTimeout(() => {
                        props.onLogin(data)
                        toggleRegister()
                    }, 1000);
                } else {
                    setError("Try Again")
                }
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
                            <p>Register</p>
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
                                            <span className="input__label">Email
                                                <span className="required ms-1 st-fs-12"> *</span>
                                            </span>
                                            <input className="input__field"
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        <label className="input">
                                            <span className="input__label">Password
                                                <span className="required ms-1 st-fs-12"> *</span>
                                            </span>
                                            <input className="input__field"
                                                type={type}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                        <span className="password__show" onClick={handleClick}>{type === 'text' ? "hide" : "show"}</span>
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
                                            onClick={() => { register() }}>{loading ? "Registering" : "Register"}</button>
                                    </div>
                                    <div className="col-lg-12 p-0 text-center mb-8">
                                        <div className="d-flex justify-content-center app-fs-14 ">
                                            <div className="text-primary">Already have an account?</div>
                                            <div
                                                onClick={() => {
                                                    toggleLogin()
                                                    toggleRegister()
                                                }}
                                                className="ml-1 text-secondary cursor-pointer">
                                                Login
                                                {/* כניסה למערכת */}
                                            </div>
                                        </div>
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