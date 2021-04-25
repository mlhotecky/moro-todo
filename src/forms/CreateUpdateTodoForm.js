import React from "react";
import { Field, reduxForm } from 'redux-form'
import {Grid, Row, Col} from "react-flexbox-grid";
import ApiLoader from "../components/ApiLoader";
import "../components/Modals/ModalWindow.scss";
import "./Forms.scss";

const validate = values => {
    const errors = {}

    if (!values.text) {
        errors.text = 'Required'
    }
    return errors
}

function CreateUpdateTodoForm(props) {
    const {
        submitting,
        handleSubmit,
    } = props;

    const {
        actionHandler,
        actionPending,
        actionText,
        closeModal,
        cancelText,
    } = props?.todoObject || {};

    const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
        <div>
            <label>{label}</label>
            <div className={asyncValidating ? 'async-validating' : ''}>
                <input {...input} type={type} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    )

        return <form onSubmit={handleSubmit}>
            <div className="modal-body create-update-form">
                <Grid>
                    <Row>
                        <Col sm={12} className="form-group">
                            <Field name="text" type="text" component={renderField} label="Text of todo" />
                        </Col>
                    </Row>
                </Grid>
            </div>
            <div className="modal-actions">
                {
                    actionPending ? <div className="modal-loader">
                        <ApiLoader height={33} width={33} color="#fff"/>
                    </div> : <button
                        type="submit"
                        disabled={submitting}
                        className="modal-button">
                        {actionText || "Submit"}
                    </button>
                }
                <div className="modal-button" onClick={closeModal}>{cancelText || "Cancel"}</div>
            </div>
        </form>
}

function mapStateToProps(state, props) {
    console.log(props.todoObject.text)
    return {
        initialValues: {
            text: props?.todoObject?.text || ""
        }
    }
}

CreateUpdateTodoForm = reduxForm({
    // a unique name for the form
    form: 'TodoForm',
    validate,
}, mapStateToProps)(CreateUpdateTodoForm)

export default CreateUpdateTodoForm;
