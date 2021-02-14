import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Link as RouterLink, NavLink} from "react-router-dom";
import {useParams} from "react-router";
import {useHttp} from "../../hooks/http.hook";
import {useState, useEffect, useCallback} from "react";
import {CatalogItem} from "./CatalogItem";
import {Preloader} from "../common/Preloader";
import {Button, Container, Grid} from "@material-ui/core";

const Catalog = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, request, clearError} = useHttp()
    const [catalogAdList, setCatalogAdList] = useState([])
    let id = useParams().id
    const getCatalogAd = async () => {
        try {
            if (id) {
                const data = await request(`/api/catalog/${id}`, `GET`)
                setCatalogAdList(data)
            } else {
                const data = await request(`/api/catalog/`, `GET`)
                setCatalogAdList(data)
            }
        } catch (e) {
        }
    }
    useEffect(() => {
        getCatalogAd()
    }, [id])
    const catalogAdItems = catalogAdList.map((item, index) => <CatalogItem key={`${item.date}_${index}`}
                                                                           {...item}/>)
    if (isLoading) {
        return <Preloader/>
    }
    return (
        <Container>
            <h2 align="center"> {id ? "Мои объявления" : "Каталог"}</h2>
            <Grid container spacing={3}>
                {catalogAdItems}
            </Grid>
            {auth.isAuth &&
            <Button component={RouterLink} to="/createnewad" variant="contained" color="primary" size="large">
                Добавить
            </Button>}
        </Container>
    )
}

export default Catalog