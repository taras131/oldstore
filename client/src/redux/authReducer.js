import {authApi} from "../api/authApi";
import axios from "axios";

const SET_AUTH = "SET_AUTH",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR"
const initialState = {
    isAuth: false,
    isLoading: false,
    error: ``,
    token: null,
    userId: null,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {...state, isAuth: action.value,token: action.token,userId: action.userId}
        case SET_LOADING:
            return {...state, isLoading: action.value}
        case SET_ERROR:
            return {...state, error: action.value}
        default:
            return state
    }
}
export const setAuth = (value,token,userId) => {
    return {type: SET_AUTH, value,token,userId}
}
export const setLoading = (value) => {
    return {type: SET_LOADING, value}
}
export const setError = (value) => {
    return {type: SET_ERROR, value}
}
export const registerThunk = (email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    let response = await authApi.register(email, password)
    console.log(response)
    dispatch(setLoading(false))
}

export const loginThunk = (email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try{
        const response = await authApi.login(email, password)
        if(response.statusText === `OK`){
            console.log(`OK`)
            dispatch(setAuth(true))
        }
        console.log(response)
    }catch (e) {
        throw e
        console.log(e)
    }finally {
        dispatch(setLoading(false))
    }


}

export default authReducer