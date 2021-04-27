import {
    ADD_TODO,
    GET_ALL_TODO_STATUS,
    GET_TODOS,
    MODIFY_TODO,
    REMOVE_TODO,
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
        case ADD_TODO:
            let added = [...state.todosList];
            added.push({...payload});
            return {
                ...state,
                todosList: added
            }
        case MODIFY_TODO:
            let modified = state.todosList.filter(todo => todo.id !== payload.id);
            modified.push({...payload});
            return {
                ...state,
                todosList: modified
            }
        case REMOVE_TODO:
            let removed = state.todosList.filter(todo => todo.id !== payload);
            return {
                ...state,
                todosList: removed
            }
        default: return state;
    }
}