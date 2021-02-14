import React, {useState, useCallback, useEffect} from "react"
import {useDispatch, useSelector,} from "react-redux";

const storageName = `userData`

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const logIn = useCallback((token, id) => {
        setToken(token)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: token
        }))
    }, [])
    const logOut = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            logIn(data.token, data.userId)
        }
    },[logIn])
    return {logIn, logOut, token, userId}
}