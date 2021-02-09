import {UserItem} from "./UserItem";
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {Preloader} from "../common/Preloader";

export const Users = () => {
    const {isLoading, error, request, clearError} = useHttp()
    const [userList, setUserList] = useState([])
    const users = userList.map((item, index) => <UserItem key={`${index}_${item.email}`} {...item}/>)
    const getUsers = async () => {
        try {
            const data = await request(`/api/auth/users`, `GET`)
            setUserList(data)
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        getUsers()
    }, [])
    if (isLoading) return <Preloader/>
    return (
        <div>
            <h2>Люди</h2>
            <div className="row">
                {users}
            </div>
        </div>

    )
}
