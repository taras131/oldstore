import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Catalog from "./components/catalog/Catalog";
import Order from "./components/order/Order";
import OrderItem from "./components/order/OrderItem";
import Auth from "./components/auth/Auth";
import {MyCatalog} from "./components/mycatalog/MyCatalog";
import {Users} from "./components/users/Users";
import {CreateNewAd} from "./components/catalog/CreateNewAd";

const useRouter = (isAuth) => {
    if (isAuth) {
        return (
            <Switch> Users
                <Route exact path="/catalog/" component={Catalog}/>
                <Route path="/catalog/:id" component={Catalog}/>
                <Route exact path="/createnewad" component={CreateNewAd}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/order"><Order/></Route>
                <Route exact path="/order/:id"><OrderItem/></Route>
                <Redirect to="/catalog"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/catalog" component={Catalog}/>
                <Route path="/"> <Auth/> </Route>
            </Switch>
        )
    }
}

export default useRouter