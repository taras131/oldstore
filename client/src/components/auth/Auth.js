import React, {useState, useEffect, useContext} from "react"
import {useLocation,useHistory} from "react-router"
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    let parameter = useLocation().pathname.split("/").pop()
    const {isLoading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: ``,
        name: ``,
        password: ``
    })
    const onChangeForms = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const onRegisterClick = async () => {
        try {
            const data = await request(`/api/auth/register`, `POST`, {...form})
            message(data.message)
            history.push(`/:login`)
        } catch (e) {
        }
    }
    const onLoginClick = async () => {
        try {
            const data = await request(`/api/auth/login`, `POST`, {...form})
            message(data.message)
            auth.logIn(data.token, data.userId)
        } catch (e) {
            console.log(e)
        }
    }
    const onExitClick = () => {
        auth.logOut()
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    if (isLoading) {
        return (
            <div>
                Загрузка
            </div>
        )
    }
    return (
        <div className="row" style={{marginTop: 150}}>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{parameter ? "Авторизация" : "Регистрация" }</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={onChangeForms}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            {!parameter &&
                            <div className="input-field">
                                <input
                                    placeholder="Введите Ваше имя"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="yellow-input"
                                    value={form.name}
                                    onChange={onChangeForms}/>
                                <label htmlFor="email">Name</label>
                            </div>}
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={onChangeForms}/>
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {auth.isAuth
                            ?
                            <button
                                onClick={onExitClick}
                                className="btn green darken-4"
                                style={{marginRight: 10}}
                                disabled={isLoading}
                            >
                                Выйти
                            </button>
                            : <>
                                {parameter
                                    ?     <button
                                        onClick={onLoginClick}
                                        className="btn green darken-4"
                                        style={{marginRight: 10}}
                                        disabled={isLoading}
                                    >
                                        Войти
                                    </button>
                                    : <button
                                        onClick={onRegisterClick}
                                        className="btn red darken-4"
                                        disabled={isLoading}
                                    >
                                        Регестрация
                                    </button> }


                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth