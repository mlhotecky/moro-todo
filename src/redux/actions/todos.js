import axios from "axios";
import {API_PREFIX} from "../../constants";

// TODOS ACTIONS

// returns all todos
export const GET_TODOS = "GET_TODOS";

// universal const for get phase of api call
export const GET_ALL_TODO_STATUS = "GET_ALL_TODO_STATUS";

// dont get all todos but only modify reducer after action
export const ADD_TODO = "ADD_TODO";
export const MODIFY_TODO = "MODIFY_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

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

const addTodo = todo => ({
    type: ADD_TODO,
    payload: todo
})

const modifyTodo = todo => ({
    type: MODIFY_TODO,
    payload: todo
})

const removeTodo = id => ({
    type: REMOVE_TODO,
    payload: id
})

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
        error(e?.response?.status || "Error");
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
        dispatch(addTodo(res.data))
        success();
    }).catch(e => {
        error(e?.response?.status || "Error");
    }).finally(() => {
        final();
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
        dispatch(modifyTodo(res.data))
        success();
    }).catch(e => {
        error(e?.response?.status || "Error");
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
        dispatch(removeTodo(id));
        success();
    }).catch(e => {
        error(e?.response?.status || "Error");
    }).finally(() => {
        final();
    })
}

export const completeTodo = (id, error = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos/${id}/complete`
    }).then(res => {
        dispatch(modifyTodo(res.data));
    }).catch(e => {
        error(e?.response?.status || "Error");
    })
}

export const incompleteTodo = (id, error = () => {}) => dispatch => {
    axios({
        method: 'post',
        url: `${API_PREFIX}/todos/${id}/incomplete`
    }).then(res => {
        dispatch(modifyTodo(res.data));
    }).catch(e => {
        error(e?.response?.status || "Error");
    })
}










