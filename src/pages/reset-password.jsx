import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordAction } from "../actions/authActon";
import Header from "../components/Header";

export default function UserId(props) {
    const [loginUser, setLoginUser] = useState(false)
    const [registerUser, setRegisterUser] = useState(false)
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


    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [confirmType, setConfirmType] = useState("password");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState("");
    const [type, setType] = useState("password");
    const params = useParams()
    const emailToken = params.id
    const naigator = useNavigate()

    const handleClick_ = () => {
        setType(type === "password" ? "text" : "password");
    };

    const handleClick = () => {
        setConfirmType(confirmType === "password" ? "text" : "password");
    };
    const reset = () => {
        if (!password) {
            setError("Password Required");
            return;
        } else if (password.length < 6) {
            setError("Password must be 6 or more than 6 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Password is not matching");
            return;
        }
        setSending(true);
        if (emailToken) {
            resetPasswordAction({ emailToken, password, confirm }, ({ error }) => {
                if (!error) {
                    setError("");
                    // setSending(false);
                    setSuccess("Password reset successfully. ");
                    setTimeout(() => {
                        naigator("/")
                    }, 5000);

                } else {
                    setError(error);
                    setSending(false);
                }
            });
        }
    };

    return (<>
        <Header admin={true}
            loginUser={loginUser}
            setLoginUser={setLoginUser}
            registerUser={registerUser}
            setRegisterUser={registerUser}
            forgetPass={forgetPass}
            setForgetPass={setForgetPass}
            toggleLogin={toggleLogin}
            toggleRegister={toggleRegister}
            toggleForgetPass={toggleForgetPass}
        />
        <div className="placeholder"></div>
        <section id="email-verify">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-12 py-5 p-0 mb-4">
                        <div className="text-center">
                            <h2 className="mb-1 mt-4">Reset Password</h2>
                            <p className="mb-1">
                                Set your new password.
                            </p>
                        </div>

                        <div className="col-lg-12 p-0">
                            <div className="form-group mt-3">
                                <label className="input">
                                    <span className="input__label">
                                        Password
                                        <span className="required ms-1 st-fs-12"> *</span>
                                    </span>
                                    <input
                                        className="input__field"
                                        type={type}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setError("")
                                        }}
                                    />
                                </label>
                                <span className="password__show" onClick={handleClick_}>
                                    {type === "text" ? "הסתר" : "הצג"}
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-12 p-0">
                            <div className="form-group mt-3">
                                <label className="input">
                                    <span className="input__label">
                                        Confirm Password
                                        <span className="required ms-1 st-fs-12"> *</span>
                                    </span>
                                    <input
                                        className="input__field"
                                        type={confirmType}
                                        placeholder="Confirm password"
                                        value={confirm}
                                        onChange={(e) => {
                                            setConfirm(e.target.value)
                                            setError("")
                                        }}
                                    />
                                </label>
                                <span className="password__show" onClick={handleClick}>
                                    {confirmType === "text" ? "הסתר" : "הצג"}
                                </span>
                            </div>
                        </div>
                        <p onClick={() => { toggleLogin() }} className="cursor-pointer text-secondary">
                            Login to your account.
                        </p>
                        <div className="col-lg-12 p-0 mb-8">
                            {success && <div className="success-data">{success}</div>}
                            {error && <div className="error-data text-danger">{error}</div>}
                        </div>
                        <p>
                            <button
                                className="btn-primary w-100"
                                type="button"
                                disabled={sending}
                                onClick={() => {
                                    reset();
                                }}>
                                {sending ? "Submitting" : "Submit"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}
