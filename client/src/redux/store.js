import authReducer from "./authReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

const reducersList = combineReducers({
    authInfo: authReducer
})

const store = createStore(reducersList, applyMiddleware(thunkMiddleware))

export default store