import axios from "axios";

export const authApi = {

    async register(email, password) {
        let response = await axios.post(`/api/auth/register`, {email: email, password: password})
        console.log(response)
        return response
    },
    login(email, password) {
        axios.post(`/api/auth/login`, {email: email, password: password})
            .then(response=>{
                console.log(response)
                return response
            })
            .catch((error)=>{
                console.log(error)
                return error
            })

    }
}