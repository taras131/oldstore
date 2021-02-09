import {NavLink, useHistory} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

export const Header = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const onLogoutClick = (event) => {
        event.preventDefault()
        auth.logOut()
        history.push(`/`)
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="container">
                    <a href="/catalog/" className="brand-logo">Лавка старьевщика</a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <NavLink to={`/catalog`}>
                                Каталог
                            </NavLink>
                        </li>
                        {auth.isAuth
                            ? <>
                                <li><NavLink to={`/catalog/${auth.userId}`}>Мои объявления</NavLink></li>
                                <li><NavLink to={`/users`}>Люди</NavLink></li>
                                <li><NavLink to={`/order`}> Заказы </NavLink></li>
                                <li>
                                    <a href={`/`} onClick={onLogoutClick}>
                                        Выйти
                                    </a>
                                </li>
                            </>
                            : <>
                                <li>
                                    <NavLink to={`/:login`}>Вход</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/`}>Регистрация</NavLink>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}