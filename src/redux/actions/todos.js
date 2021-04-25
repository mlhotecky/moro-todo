import axios from "axios";
import {API_PREFIX} from "../../constants";

// TODOS ACTIONS

// returns all todos
export const GET_TODOS = "GET_TODOS";

// universal const for catch phase of api call
export const GET_ALL_TODO_STATUS = "GET_ALL_TODO_STATUS";

export const PENDING = "PENDING";
export const SUCCEEDED = "SUCCEEDED";
export const REJECTED = "REJECTED";

const getTodoStatus = (status) => ({
    type: GET_ALL_TODO_STATUS,
    payload: status
});

const storeTodos = todos => ({
   type: GET_TODOS,
   payload: todos
});

export const getAllTodos = (error = () => {}) => dispatch => {
    dispatch(getTodoStatus(PENDING));
    axios({
        method: 'get',
        url: `${API_PREFIX}/todos`
    }).then(res => {
        dispatch(getTodoStatus(SUCCEEDED));
        dispatch(storeTodos(res.data));
    }).catch(e => {
        dispatch(getTodoStatus(REJECTED));
        error(e.response.status);
    })
}

export const createTodo = (
    todo,
    success = () => {},
    error = () => {},
    final = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos`,
        data: {...todo}
    }).then(res => {
        dispatch(getAllTodos());
        success();
    }).catch(e => {
        error(e.response.status);
    }).finally(() => {
        final()
    })
}

export const updateTodo = (
    id,
    todo,
    success = () => {},
    error = () => {},
    final = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos/${id}`,
        data: {...todo}
    }).then(res => {
        dispatch(getAllTodos());
        success();
    }).catch(e => {
        error(e.response.status);
    }).finally(() => {
        final();
    })
}

export const deleteTodo = (
    id,
    success = () => {},
    error = () => {},
    final = () => {}) => dispatch => {
    axios({
        method: 'delete',
        url: `${API_PREFIX}/todos/${id}`
    }).then(res => {
        dispatch(getAllTodos());
        success();
    }).catch(e => {
        error(e.response.status);
    }).finally(() => {
        final();
    })
}

export const completeTodo = (id, error = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos/${id}/complete`
    }).then(res => {
        dispatch(getAllTodos());
    }).catch(e => {
        error(e.response.status);
    })
}

export const incompleteTodo = (id, error = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos/${id}/incomplete`
    }).then(res => {
        dispatch(getAllTodos());
    }).catch(e => {
        error(e.response.status);
    })
}










