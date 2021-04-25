import {
    GET_ALL_TODO_STATUS,
    GET_TODOS,
} from "../actions/todos";

const initialState = {
    todosList: [],
    todoStatus: null
}

export const todosReducer = (
    state = initialState,
    {type, payload}) => {
    switch (type) {
        case GET_TODOS:
            return {
                ...state,
                todosList: payload
            }
        case GET_ALL_TODO_STATUS:
            return {
                ...state,
                todoStatus: payload
            }
        default: return state;
    }
}