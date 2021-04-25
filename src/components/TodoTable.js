import React, {useState} from "react";
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

export default function TodoTable(props) {
    const dispatch = useDispatch();
    const data = props?.data || [];
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] = useState(null);
    const [id, setId] = useState(null);

    function deleteTodoConfirm(id) {
        setDeleteConfirmModal(true);
        setId(id);
    }

    function updateTodoModal(todo) {
        setUpdateModal(true);
        setId(todo.id);
        setTodo({text: todo.text});
    }

    function handleUpdateTodo() {
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
                setTodo(null);
                setLoading(false);
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

    console.log()

    return (
        <>
            <ModalConfirm
                isOpen={deleteConfirmModal}
                closeModal={() => setDeleteConfirmModal(false)}
                content={() => <div>Delete this todo?</div>}
                headerText="Delete Todo"
                actionHandler={handleDeleteTodo}
                actionText="Delete"
                actionPending={loading}
            />
            <ModalForm
                isOpen={updateModal}
                closeModal={() => setUpdateModal(false)}
                formComponent={(props) => <CreateUpdateTodoForm todoObject={{...props, text: todo?.text || "" }} />}
                headerText="Update Todo"
                actionHandler={handleUpdateTodo}
                actionText="Update"
                actionPending={loading}
            />
            <div className="todo-table">
                <Row className="todo-header">
                    <Col xs={7}>Description</Col>
                    <Col xs={2}>Created</Col>
                    <Col xs={2}>Completed</Col>
                    <Col xs={1}>Actions</Col>
                </Row>
                {data.length > 0 && data.map((todo, index) => {
                    return <Row key={index} className={`todo-row ${todo?.completed ? "completed" : ""}`}>
                        <Col xs={7}>{todo?.text || ""}</Col>
                        <Col xs={2}>{todo?.createdDate ? new Date(todo.createdDate).toDateString() : ""}</Col>
                        <Col xs={2}>{todo?.completedDate ? new Date(todo.completedDate).toDateString() : ""}</Col>
                        <Col xs={1}>
                            <Row>
                                <Col xs={4}>
                                    <FontAwesomeIcon
                                        className="cursor-pointer"
                                        icon={faPencilAlt}
                                        onClick={() => updateTodoModal(todo)}
                                    />
                                </Col>
                                {todo?.completed ?
                                    <Col xs={4}>
                                        <FontAwesomeIcon
                                            className="cursor-pointer"
                                            icon={faRedo}
                                            onClick={() => incompleteTodoHandler(todo.id)}
                                        />
                                    </Col>
                                    :
                                    <Col xs={4}>
                                        <FontAwesomeIcon
                                            className="cursor-pointer"
                                            icon={faCheck}
                                            onClick={() => completeTodoHandler(todo.id)}
                                        />
                                    </Col>
                                }
                                <Col xs={4}>
                                    <FontAwesomeIcon
                                        className="cursor-pointer"
                                        onClick={() => deleteTodoConfirm(todo.id)}
                                        icon={faTrash}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                })}
            </div>
        </>
    )
}