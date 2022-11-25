import { combineReducers } from "redux";
import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
import questionReducer from './questionReducer'
import allUserReducer from "./allUserReducer";
export const reducers = combineReducers({
    authReducer,
    currentUserReducer, allUserReducer,
    questionReducer
});