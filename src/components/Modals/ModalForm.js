import React from "react";
import Modal from "react-modal";
import "./ModalWindow.scss";

//component for work with forms in modal windows
export default function ModalForm(props) {
    const {
        isOpen,
        closeModal,
        formComponent,
        headerText,
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

    // modal wrapper header only - actions defined in formComponent
    // previous architecture because redux form want onSubmit={handleSubmit} definition and button type submit inside of form
    // unnecessary duplicate definition of redux form if i want submit button outside
    // now it can be solved by callback function
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