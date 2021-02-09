import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {Preloader} from "../common/Preloader";

export const CreateNewAd = () => {
    const {isLoading, error, request, clearError} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        title:``,
        text: ``,
        price: ``,
        phone: ``
    })
    const onChangeForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const onAddClick = async () => {
        try {
            const data = await request(`/api/catalog/create`, `POST`, {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            setForm({
                title:``,
                text: ``,
                price: ``,
                phone: ``
            })
            message("Ваше объявление добавлено")
        } catch (e) {

        }
    }

    if(isLoading){
        return <Preloader/>
    }
    return (
        <div className="row" style={{marginTop: 150}}>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавьте своё объявление</span>
                        <div>
                            <div className="input-field col s10">
                                <input name="title" onChange={onChangeForm} value={form.title} id="title"
                                       type="text" className="validate"/>
                                <label className="active" htmlFor="title">Заголовок</label>
                            </div>
                            <div className="input-field col s10">
                                <input name="text" onChange={onChangeForm} value={form.text} id="text"
                                       type="text" className="validate"/>
                                <label className="active" htmlFor="text">Описание</label>
                            </div>
                            <div className="input-field col s10">
                                <input name="price" onChange={onChangeForm} value={form.price} id="price"
                                       type="text" className="validate"/>
                                <label className="active" htmlFor="price">Цена</label>
                            </div>
                            <div className="input-field col s10">
                                <input name="phone" onChange={onChangeForm} value={form.phone} id="phone"
                                       type="text" className="validate"/>
                                <label className="active" htmlFor="phone">Телефон</label>
                            </div>
                            <button onClick={onAddClick} className="waves-effect waves-light btn-large">Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}