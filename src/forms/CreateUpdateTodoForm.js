import React, {useState} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import ApiLoader from "../components/ApiLoader";
import "../components/Modals/ModalWindow.scss";
import "./Forms.scss";

export default function CreateUpdateTodoForm(props) {

    // props from modal
    const {
        actionHandler,
        actionPending,
        actionText,
        closeModal,
        cancelText,
        initial
    } = props?.todoObject || {};

    // initial attributes and values of form
    const initialFields = {
        text: ""
    }

    // definition of form object - initial when update || initialFields when create new one
    const [formValues, setFormValues] = useState(initial || initialFields);

    // array of touched fields for showing validation messages
    const [touchedFields, setTouchedFields] = useState([]);

    // all field names of form - only text in this case
    const formFields = ["text"];

    // const for return value by name or initial value
    // can be made with typeof validation but it is´nt necessary in this case
    const val = (name) => formValues?.[name] || "";

    // very simplified for one input
    // can be solved with foreach by Object.entries(value) with typeof validation and counter for exceptions
    const validForm = formValues?.text?.length > 0;

    // function for touch field after onBlur input event
    function touchField({target: {name}}) {
        const newTouchedFields = [...touchedFields];
        if (!newTouchedFields.includes(name)) {
            newTouchedFields.push(name);
        }
        setTouchedFields(newTouchedFields);
    }

    // function for touch all fields after form has invalid values
    function touchAll() {
        const newTouchedFields = [];
        formFields.forEach(name => {
            newTouchedFields.push(name);
        })
        setTouchedFields(newTouchedFields);
    }

    // set value to form object by name of input
    const handleChange = ({target: {name, value}}) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    // submit form - if validation is ok, do callback by modal prop
    // or touch all fields for displaying error messages
    function submitHandler() {
        if (validForm) {
        actionHandler(formValues);
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
                                {touchedFields?.includes("text") && formValues?.text?.length === 0 &&
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
