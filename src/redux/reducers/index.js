import {combineReducers} from "@reduxjs/toolkit";
import {todosReducer} from "./todos";
import {reducer as toastrReducer} from "react-redux-toastr";

const rootReducer = combineReducers({
    todos: todosReducer,
    toastr: toastrReducer,
})

export default rootReducer;