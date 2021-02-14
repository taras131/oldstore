import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Header} from "./components/header/Header";
import {Message} from "./components/common/Message";
import {useMessage} from "./hooks/message.hook";

function App() {
    const {token, logIn, logOut, userId} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
    const {message}= useMessage()
    console.log(message)
    return (
        <AuthContext.Provider value={{
            token, logIn, logOut, userId, isAuth,
        }}>
            <Router>
                <Header/>
                <div className="container">
                    {routes}
                    <Message message ={message} />
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
