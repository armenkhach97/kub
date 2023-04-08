import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { deleteRoomAction, editRoomAction } from '../../actions/roomAction';

function DeleteRoom(props) {
    const { selDeleteRoom, toggleDeleteRoom, getRooms, isOpen } = props
    const [success, setSuccess] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("")

    const onSubmit = () => {
        if (selDeleteRoom._id) {
            selDeleteRoom.status = "inactive"
            setSuccess(false);
            setError('');
            setSending(true);
            deleteRoomAction(selDeleteRoom, ({ error }) => {
                if (!error) {
                    setSending(false);
                    if (room.image) {
                    } else {
                        setSuccess('Room Deleted Successfully');
                        setTimeout(() => {
                            toggleDeleteRoom()
                        }, 1000);
                        getRooms()
                    }

                } else {
                    setSending(false);
                }
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleDeleteRoom}
            contentLabel="My dialog"
            className="mymodal auth-modal"
            overlayClassName="myoverlay auth-overlay"
            closeTimeoutMS={500}
            ariaHideApp={false}>
            <div className="row">
                <div className="col-lg-12 text-center justify-content-center d-flex flex-column p-0">
                    <div className=" d-flex align-items-center justify-content-between py-2 custom-modal-header mb-4">
                        <div className="text-capitalize m-0 section-title">
                            <p>Delete Room</p>
                        </div>
                        <div
                            className="app-fs-20 app-fw-600 text-right cursor-pointer "
                            onClick={toggleDeleteRoom}>
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
                            <div className='row'>
                                <div className="col-lg-12 col-xl-12 col-sm-12 p-0">
                                    <div className="form-group">
                                        <span className="app-fw-600 app-fs-18 text-center text-danger">Are you sure to delete this room?
                                        </span>
                                        <p className='app-fs-14'>This action can not be undo. By deleting this room, you will not be able to access the sessions of this room.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 p-0">
                                    {success && <div className="app-fs-14 text-left mb-8 success-data py-2 rounded">{success}</div>}
                                </div>
                                <div className="col-lg-12 p-0 text-center d-flex text-center justify-content-center">
                                    <button className="btn-danger mt-3 mb-2 py-2 w-25"
                                        disabled={sending}
                                        type="button"
                                        onClick={() => { onSubmit() }}>{sending ? "Deleting" : "Delete"}</button>
                                    <button className="btn-cancel mt-3 mb-2 py-2 w-25 ml-1"
                                        type="button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}
export default DeleteRoom;
