import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllTodos, REJECTED, PENDING, SUCCEEDED} from "../redux/actions/todos";
import ApiLoader from "./ApiLoader";
import {toastr} from "react-redux-toastr";
import {Grid, Row, Col} from "react-flexbox-grid";
import TodoTable from "./TodoTable";

export default function TodoList(props) {
    const dispatch = useDispatch();
    const todosList = useSelector(state => state.todos.todosList);
    const getTodoStatus = useSelector(state => state.todos.todoStatus);
    const {onlyCompleted} = props;

    useEffect(() => {
        dispatch(getAllTodos((error) => {
            toastr.error(`${error}`, "Error occurred while fetching todos.")
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // filter completed todos by state not by action
    const todos = onlyCompleted ? todosList.filter(todo => todo.completed) : todosList;

    let content;

    const dataMessageWrapper = (message) => <div className="data-message"><span>{message}</span></div>

    switch (getTodoStatus) {
        case PENDING:
            content = (
                <Row>
                    <Col xs={12} className="todo-loader">
                        <ApiLoader/>
                    </Col>
                </Row>
            )
            break;
        case SUCCEEDED:
            if (todos?.length === 0) {
                content = (
                    <div className="todo-table-wrapper">
                        {dataMessageWrapper("No data.")}
                    </div>
                )
            } else {
                content = (
                    <div className="todo-table-wrapper">
                        <TodoTable data={todos}/>
                    </div>
                )
            }
            break;
        case REJECTED:
            content = (
                <div className="todo-table-wrapper">
                    {dataMessageWrapper("Error occured while fetching data.")}
                </div>
            )
            break;
        default:
            content = (
                <Row>
                    <Col xs={12} className="todo-loader">
                        <ApiLoader/>
                    </Col>
                </Row>
            )
    }

    return (
        <Grid>
            {content}
        </Grid>
    )
}