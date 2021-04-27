import React from "react";
import Modal from "react-modal";
import ApiLoader from "../ApiLoader";
import "./ModalWindow.scss";

// component for displaying of confirm messages by modal window
export default function ModalConfirm(props) {
    const {
        modalWidth,
        isOpen,
        closeModal,
        headerText,
        confirmText,
        cancelText,
        actionText,
        actionHandler,
        actionPending
    } = props;

    // by documentation, its difficult to access by scss file
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
        }
    };

    // modal wrapper with header and action / cancel buttons
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className="modal-layout" style={{width: modalWidth || "400px"}}>
                <div className="modal-header">{headerText || "Make action"}</div>
                <div className="modal-body">
                    <div>
                        {confirmText}
                    </div>
                </div>
                <div className="modal-actions">
                    {
                        actionPending ? <div className="modal-loader">
                            <ApiLoader height={33} width={33} color="#fff"/>
                        </div> : <div
                            className="modal-button"
                            onClick={actionHandler}>
                            {actionText || "Submit"}
                        </div>
                    }
                    <div className="modal-button" onClick={closeModal}>{cancelText || "Cancel"}</div>
                </div>
            </div>
        </Modal>
    )
}