import React, {useState} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import ApiLoader from "../components/ApiLoader";
import "../components/Modals/ModalWindow.scss";
import "./Forms.scss";

export default function CreateUpdateTodoForm(props) {

    const {
        actionHandler,
        actionPending,
        actionText,
        closeModal,
        cancelText,
        initial
    } = props?.todoObject || {};

    const initialFields = {
        text: ""
    }

    const [value, setValue] = useState(initial || initialFields);
    const [touched, setTouched] = useState([]);

    const formFields = ["text"];
    const val = (name) => value?.[name] || "";
    const validForm = value?.text?.length > 0;

    const touchField = ({target: {name, value}}) => {
        const newTouched = [...touched];
        if (!newTouched.includes(name)) {
        newTouched.push(name);
        }
        setTouched(newTouched);
    }

    function touchAll() {
        const newTouched = [];
        formFields.forEach(name => {
            newTouched.push(name);
        })
        setTouched(newTouched);
    }

    const handleChange = ({target: {name, value}}) => {
        setValue({
            ...value,
            [name]: value
        });
    }

    function submitHandler() {
        if (validForm) {
        actionHandler(value);
        } else {
            touchAll();
        }
    }

    return (
        <>
            <div className="modal-body create-update-form">
                <Grid>
                    <Row>
                        <Col sm={12} className="form-group">
                            <label>Text of todo</label>
                                <input
                                    type="text"
                                    name="text"
                                    value={val("text")}
                                    onChange={handleChange}
                                    onBlur={touchField}
                                />
                                {touched?.includes("text") && value?.text?.length === 0 &&
                                <span className="form-error">Required</span>}
                        </Col>
                    </Row>
                </Grid>
            </div>
            <div className="modal-actions">
                {
                    actionPending ? <div className="modal-loader">
                        <ApiLoader height={33} width={33} color="#fff"/>
                    </div> : <div
                        onClick={submitHandler}
                        className="modal-button">
                        {actionText || "Submit"}
                    </div>
                }
                <div className="modal-button" onClick={closeModal}>{cancelText || "Cancel"}</div>
            </div>
        </>
    )
}
