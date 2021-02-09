import React ,{useState, useCallback} from "react"

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = `GET`, body = null, headers = {}) => {
        if(body){
            body = JSON.stringify(body)
        }
        headers['Content-Type'] = 'application/json'
        setIsLoading(true)
        try {
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setIsLoading(false)
            return data
        } catch (e) {
            setIsLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {isLoading, error, request, clearError}
}