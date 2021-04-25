import {combineReducers} from "@reduxjs/toolkit";
import {todosReducer} from "./todos";
import {reducer as toastrReducer} from "react-redux-toastr";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    todos: todosReducer,
    toastr: toastrReducer,
    form: formReducer
})

export default rootReducer;