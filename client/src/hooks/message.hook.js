import {useCallback, useEffect, useState} from "react";

export const useMessage = () => {
    const [message, setMessage] = useState(null)
    useEffect(()=>{
        const addMessage = (text) => {
            console.log(text)
            setMessage(text)
            console.log(message)
        }
    })

    return message
}