import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { addRoomAction, editRoomAction } from '../../actions/roomAction';
import { trimJSON } from '../../utils/commonUtils';

function AddRoom(props) {
    const { selRoom, toggleRoom, getRooms, isOpen } = props
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [sending, setSending] = useState(false);

    const [cost, setCost] = useState(selRoom?.roomCost || 0)
    const [no, setNo] = useState(selRoom?.playersNum || 0)
    const [SBT, setSBT] = useState(selRoom?.standbyTime || 0)
    useEffect(() => {
        if (selRoom) {
            setCost(selRoom.roomCost)
            setSBT(selRoom.standbyTime)
            setNo(selRoom.playersNum)
        }
    }, [])

    const onSubmit = () => {
        const v = { ...selRoom, roomCost: parseInt(cost), playersNum: no, standbyTime: parseInt(SBT) }
        if (cost < 20) {
            setError("Cost should be greater than or equal to 20")
            return
        }
        if (!no) {
            setError("no Required")
            return
        }
        if (SBT < 2) {
            setError("Stand by time should be greater than or equal to 2.")
            return
        }
        const values = trimJSON(v)
        if (values) {
            setSuccess(false);
            setError('');
            setSending(true);
            updateRoom(values)
        }
    };

    const updateRoom = (values) => {
        if (values._id) {
            editRoomAction(values, ({ error }) => {
                if (!error) {
                    setError('');
                    setSending(false);
                    setLoading(false);
                    setSuccess('Room Updated Successfully');
                    setTimeout(() => {
                        toggleRoom()
                    }, 1000);
                    getRooms()
                } else {
                    setSending(false);
                    setError(error);
                }
            });
        } else {
            addRoomAction(values, ({ error }) => {
                if (!error) {
                    setSuccess('Room Added Successfully');
                    setTimeout(() => {
                        toggleRoom();
                    }, 1000);
                    getRooms();
                } else {
                    setError(error);
                    setSending(false);
                }
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleRoom}
            contentLabel="My dialog"
            className="mymodal auth-modal"
            overlayClassName="myoverlay auth-overlay"
            closeTimeoutMS={500}
            ariaHideApp={false}>
            <div className="row">
                <div className="col-lg-12 text-center justify-content-center d-flex flex-column p-0">
                    <div className=" d-flex align-items-center justify-content-between py-2 custom-modal-header mb-4">
                        <div className="text-capitalize m-0 section-title">
                            <p>{(selRoom && selRoom._id) ? "Edit Room" : "Add Room"}</p>
                            {/* <p>{(selRoom && selRoom._id) ? "עריכת חדר" : "הוספת חדר"}</p> */}
                        </div>
                        <div
                            className="app-fs-20 app-fw-600 text-right cursor-pointer "
                            onClick={toggleRoom}>
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
                            {loading ? "" : <div className='row'>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group">
                                        <label className="input">
                                            <span className="input__label">Cost
                                                {/* שם חדר */}
                                                <span className="required ms-1 st-fs-12"> *</span>
                                            </span>
                                            <input className="input__field"
                                                placeholder="Cost"
                                                type="number"
                                                value={cost}
                                                onChange={(e) => {
                                                    setCost(e.target.value || 0)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        {/* <label className="input">
                                            <span className="input__label">תמונה
                                            </span>
                                            <input className="input__field"
                                                type="file"
                                                onChange={e => {
                                                    setImage(e.target.files[0])
                                                    setError("")
                                                }}
                                                accept="image/*"
                                            />

                                        </label>
                                        <br /> */}
                                        {/* <span className=''>
                                            {!image ? <img id="imagePreview" height="auto" width="100%" style={{ maxHeight: 150, objectFit: "contain" }} className="img-fluid border"
                                                src={selRoom?.image || ""} /> :
                                                <img id="imagePreview" height="auto" width="100%" style={{ maxHeight: 150, objectFit: "contain" }} className="img-fluid border"
                                                    src={URL.createObjectURL(image)} />}
                                        </span> */}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        <label className="input">
                                            <span className="input__label">Player No
                                                {/* תאור */}
                                            </span>
                                            <select className="input__field"
                                                rows={6}
                                                placeholder="PlayerNo"//"תאור"
                                                value={no}
                                                onChange={(e) => {
                                                    setNo(e.target.value)
                                                    setError("")
                                                }}>
                                                <option value="">Select Player Num</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                            </select>

                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group mt-3">
                                        <label className="input">
                                            <span className="input__label">Standby Time
                                                {/* תאור */}
                                            </span>
                                            <input className="input__field"
                                                type="number"
                                                placeholder="Standby Time"//"תאור"
                                                value={SBT}
                                                onChange={(e) => {
                                                    setSBT(e.target.value || 0)
                                                    setError("")
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>
                            </div>}
                            <div className="row">
                                <div className="col-lg-12 p-0">
                                    {error && <div className="app-fs-14 text-left mb-8 error-data py-2 rounded">{error}</div>}
                                    {success && <div className="app-fs-14 text-left mb-8 success-data py-2 rounded">{success}</div>}
                                </div>
                                <div className="col-lg-12 p-0 text-center">
                                    <button className="btn-primary mt-3 mb-2 py-2 w-100"
                                        disabled={sending}
                                        type="button"
                                        onClick={() => { onSubmit() }}>{sending ? "שומר" : "שמירה"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}
export default AddRoom;
