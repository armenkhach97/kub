import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { forgetPasswordAction } from "../../actions/authActon";

export default function ForgotPassword(props) {
    const { toggleForgetPass, isOpen } = props;
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState("")

    const submit = () => {
        if (!email) {
            setError("Email Required")
            return
        }
        setSending(true)
        forgetPasswordAction({ email }, ({ message, error }) => {
            setSending(false)
            if (message === "Rest Email sent.") {
                setError("")
                setSuccess("Check your email to reset password")
                setTimeout(() => {
                    toggleForgetPass()
                }, 5000);
            } else {
                setError(error || message)
            }
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleForgetPass}
            contentLabel="My dialog"
            className="mymodal address-modal"
            overlayClassName="myoverlay address-overlay"
            closeTimeoutMS={500}
            ariaHideApp={false}>
            <div className="custome-modal bg-white" style={{ direction: "ltr" }}>
                <div className=" d-flex align-items-center justify-content-between py-2 custom-modal-header mb-4">
                    <div className="text-capitalize m-0 section-title lk-fs-20 lk-fw-600">
                        <p>Forgot Password</p>
                    </div>

                    <div
                        className="ls-fs-20 ls-fw-600 text-right cursor-pointer "
                        onClick={toggleForgetPass}>
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

                <p className="mb-1">
                    Please enter your account email address and we will send you a
                    reset password link to your mail.
                </p>
                <div className=" custom-modal-body">
                    <div className="row">
                        <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                            <div className="form-group">
                                <label className="input">
                                    <span className="input__label">
                                        Email
                                        <span className="required ms-1 st-fs-12"> *</span>
                                    </span>
                                    <input
                                        className="input__field"
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
                    </div>
                    <div className="mt-12">
                        <div className="col-lg-12 p-0 mb-8">
                            {success && <div className="success-data">{success}</div>}
                            {error && <div className="error-data text-danger">{error}</div>}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 col-12 p-0">
                                <button
                                    type="button"
                                    className="btn-primary mt-3 mb-2 py-2 w-100 form-group"
                                    disabled={sending}
                                    onClick={submit}
                                >
                                    {sending ? "Submitting" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Modal >
    );
}
