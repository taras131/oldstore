import "materialize-css"
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Header} from "./components/header/Header";

function App() {
    const {token, logIn, logOut, userId} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
    console.log(token, userId, isAuth)
    return (
        <AuthContext.Provider value={{
            token, logIn, logOut, userId, isAuth
        }}>
            <Router>
                <Header/>
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
