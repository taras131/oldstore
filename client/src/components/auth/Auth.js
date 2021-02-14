import React, {useState, useEffect, useContext} from "react"
import {useLocation, useHistory} from "react-router"
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useAuth} from "../../hooks/auth.hook";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        flexGrow: 5,
        padding: theme.spacing(8),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Auth = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const history = useHistory()
    let parameter = useLocation().pathname.split("/").pop()
    const {isLoading, error, request, clearError} = useHttp()
    const {addMessage} = useMessage()
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
            console.log(data.message)
            addMessage(data.message)
            history.push(`/login`)
        } catch (e) {
        }
    }
    const onLoginClick = async () => {
        try {
            const data = await request(`/api/auth/login`, `POST`, {...form})
            addMessage(data.message)
            console.log(data.message)
            auth.logIn(data.token, data.userId)
        } catch (e) {
            console.log(e)
        }
    }
    const onExitClick = () => {
        auth.logOut()
    }

    useEffect(() => {
        addMessage(error)
        clearError()
    }, [error,addMessage , clearError])
    if (isLoading) {
        return (
            <div>
                Загрузка
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={12} md={10} xl={8}>
                        <Typography align="center" variant="h4" color="primary">
                            {parameter === `login`
                                ? "Вход"
                                : "Регистрация"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={10} xl={8}>
                        <TextField
                            error
                            id="email"
                            name="email"
                            label="Email"
                            value={form.email}
                            onChange={onChangeForms}
                            helperText="Incorrect entry."
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {parameter === `login`
                        ? ``
                        : <Grid item xs={12} md={10} xl={8}>
                            <TextField
                                error
                                id="name"
                                name="name"
                                label="Name"
                                value={form.name}
                                onChange={onChangeForms}
                                helperText="Incorrect entry."
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>}

                    <Grid item xs={12} md={10} xl={12}>
                        <TextField
                            error
                            id="password"
                            name="password"
                            label="Password"
                            value={form.password}
                            onChange={onChangeForms}
                            helperText="Incorrect entry."
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={10} xl={12}>
                        {parameter === `login`
                            ? <Button disabled={isLoading}
                                      onClick={onLoginClick}
                                      size="large"
                                      variant="contained"
                                      color="primary">
                                Войти
                            </Button>
                            :
                            <Button disabled={isLoading}
                                    onClick={onRegisterClick}
                                    size="large"
                                    variant="contained"
                                    color="primary">
                                Отправить
                            </Button>}
                    </Grid>
                </Grid>
            </Paper>
        </div>


    )
}

export default Auth