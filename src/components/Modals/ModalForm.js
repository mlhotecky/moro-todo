import React from "react";
import Modal from "react-modal";
import "./ModalWindow.scss";

export default function ModalForm(props) {
    const {
        isOpen,
        closeModal,
        formComponent,
        headerText,
    } = props;

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

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className="modal-layout">
                <div className="modal-header">{headerText || "Make action"}</div>
                {formComponent(props)}
            </div>
        </Modal>
    )
}