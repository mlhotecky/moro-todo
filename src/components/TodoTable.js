import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {toastr} from "react-redux-toastr";
import {Row, Col} from "react-flexbox-grid";
import {faCheck, faPencilAlt, faRedo, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    updateTodo,
    deleteTodo,
    completeTodo,
    incompleteTodo
} from "../redux/actions/todos";
import ModalConfirm from "./Modals/ModalConfirm";
import CreateUpdateTodoForm from "../forms/CreateUpdateTodoForm";
import "./TodoTable.scss";
import ModalForm from "./Modals/ModalForm";
import {ALL, COMPLETED, NOT_DONE} from "../constants";

export default function TodoTable(props) {
    const dispatch = useDispatch();
    const data = props?.data || [];
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initTodo, setInitTodo] = useState(null);
    const [id, setId] = useState(null);
    const [filter, setFilter] = useState(ALL);

    let filteredData;

    switch (filter) {
        case COMPLETED:
            filteredData = data.filter(todo => todo.completed);
            console.log(data.filter(todo => todo.completed))
            break;
        case NOT_DONE:
            filteredData = data.filter(todo => !todo.completed);
            console.log(data.filter(todo => !todo.completed));
            break;
        case ALL:
            filteredData = data;
            break;
        default:
            filteredData = data
    }

    function deleteTodoConfirm(id) {
        setDeleteConfirmModal(true);
        setId(id);
    }

    function updateTodoModal(todo) {
        setUpdateModal(true);
        setId(todo.id);
        setInitTodo({text: todo.text});
    }

    function handleUpdateTodo(todo) {
        setLoading(true);
        dispatch(updateTodo(id, todo,
            () => {
                toastr.success("Success!", "Todo successfully updated.");
            },
            (error) => {
                toastr.error(`${error}`, "Error occurred while updating todo.")
            },
            () => {
                setId(null);
                setInitTodo(null);
                setLoading(false);
                setUpdateModal(false);
            }
            )
        )
    }

    function handleDeleteTodo() {
        setLoading(true);
        dispatch(deleteTodo(id,
            () => {
                toastr.success("Success!", "Todo successfully deleted.");
            },
            (error) => {
                toastr.error(`${error}`, "Error occurred while deleting todo.")
            },
            () => {
                setId(null);
                setLoading(false);
            }
            )
        )
    }

    function completeTodoHandler(id) {
        dispatch(completeTodo(id,
            (error) => {
                toastr.error(`${error}`, "Error occurred while completing todo.")
            }))
    }

    function incompleteTodoHandler(id) {
        dispatch(incompleteTodo(id,
            (error) => {
                toastr.error(`${error}`, "Error occurred while incomplete todo.")
            }
            )
        )
    }

    console.log(filteredData)

    return (
        <>
            <ModalConfirm
                isOpen={deleteConfirmModal}
                closeModal={() => setDeleteConfirmModal(false)}
                confirmText="Delete this todo?"
                headerText="Delete Todo"
                actionHandler={handleDeleteTodo}
                actionText="Delete"
                actionPending={loading}
            />
            <ModalForm
                isOpen={updateModal}
                closeModal={() => setUpdateModal(false)}
                formComponent={(props) => <CreateUpdateTodoForm todoObject={{...props, text: initTodo?.text || "" }} />}
                headerText="Update Todo"
                actionHandler={handleUpdateTodo}
                actionText="Update"
                actionPending={loading}
                initial={initTodo}
            />
            <div className="todo-table">
                <Row className="todo-header">
                    <Col xs={6}>Description</Col>
                    <Col xs={2}>Created</Col>
                    <Col xs={2}>Completed</Col>
                    <Col xs={2} className="actions">Actions</Col>
                </Row>
                {filteredData.length > 0 && filteredData.map((todo, index) => {
                    return <Row key={index} className={`todo-row ${todo?.completed ? "completed" : ""}`}>
                        <Col lg={6} md={6} sm={12}>
                            <span className="mobile-header">Description: </span>
                            <span>{todo?.text || ""}</span>
                        </Col>
                        <Col lg={2} md={2} sm={12}>
                            <span className="mobile-header">Created: </span>
                            <span>{todo?.createdDate ? new Date(todo.createdDate).toDateString() : ""}</span>
                        </Col>
                        <Col lg={2} md={2} sm={12}>
                            <span className="mobile-header">Completed: </span>
                            <span>{todo?.completedDate ? new Date(todo.completedDate).toDateString() : ""}</span>
                        </Col>
                        <Col lg={2} md={2} sm={12}>
                            <Row className="table-actions">
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    icon={faPencilAlt}
                                    onClick={() => updateTodoModal(todo)}
                                />
                                {todo?.completed ?
                                    <FontAwesomeIcon
                                        className="cursor-pointer"
                                        icon={faRedo}
                                        onClick={() => incompleteTodoHandler(todo.id)}
                                    />
                                    :
                                    <FontAwesomeIcon
                                        className="cursor-pointer"
                                        icon={faCheck}
                                        onClick={() => completeTodoHandler(todo.id)}
                                    />
                                }
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    onClick={() => deleteTodoConfirm(todo.id)}
                                    icon={faTrash}
                                />
                            </Row>
                        </Col>
                    </Row>
                })}
                <Row className="table-footer">
                    <Col lg={3} md={3} className="counter">
                        <span>Count(done): {filteredData.filter(t => t.completed).length}</span>
                    </Col>
                    <Col lg={6} md={6} className="table-btn-wrapper">
                        <div
                            className={`table-button ${filter === COMPLETED ? "active" : ""}`}
                            onClick={() => setFilter(COMPLETED)}>
                            Completed
                        </div>
                        <div
                            className={`table-button ${filter === NOT_DONE ? "active" : ""}`}
                            onClick={() => setFilter(NOT_DONE)}>
                            Not done
                        </div>
                        <div
                            className={`table-button ${filter === ALL ? "active" : ""}`}
                            onClick={() => setFilter(ALL)}>
                            All
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}