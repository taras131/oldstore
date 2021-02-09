import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import {useParams} from "react-router";
import {useHttp} from "../../hooks/http.hook";
import {useState, useEffect,useCallback} from "react";
import {CatalogItem} from "./CatalogItem";
import {Preloader} from "../common/Preloader";


const Catalog = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, request, clearError} = useHttp()
    const [catalogAdList, setCatalogAdList] = useState([])
    let id = useParams().id
    const getCatalogAd = useCallback( async () => {
        try {
            if(id) {
                const data = await request(`/api/catalog/${id}`, `GET`)
                setCatalogAdList(data)
            } else{
                const data = await request(`/api/catalog/`, `GET`)
                setCatalogAdList(data)
            }
        } catch (e) {}
    },[id])
    useEffect(() => {
        getCatalogAd()
    }, [getCatalogAd])
    const catalogAdItems = catalogAdList.map((item, index) => <CatalogItem key={`${item.date}_${index}`}
                                                                           {...item}/>)
    if (isLoading) {
        return <Preloader/>
    }
    return (
        <div className="container">
            <div className="row">
                <h2> {id ? "Мои объявления" : "Каталог"}</h2>
                {catalogAdItems}
            </div>
            {auth.isAuth &&
            <NavLink to="/createnewad">
                <button className="waves-effect waves-light btn-large">Добавить</button>
            </NavLink>}
        </div>
    )
}

export default Catalog