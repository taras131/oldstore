import {Link as RouterLink, useHistory} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Menu} from "./Menu";
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Button, ButtonGroup, Grid, Hidden} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Header = () => {
    const classes = useStyles();
    const history = useHistory()
    const auth = useContext(AuthContext)
    const onLogoutClick = (event) => {
        event.preventDefault()
        auth.logOut()
        history.push(`/`)
    }
    return (
        <AppBar position="static">
            <div>
                <Toolbar>
                    <Grid container justify="center" spacing={3}>
                        <Hidden mdUp>
                            <Grid item>
                                <IconButton edge="start" className={classes.menuButton} color="inherit"
                                            aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item>
                            <Typography variant="h4">
                                Редкости{` `}
                                <Hidden xsDown>
                                    и древности
                                </Hidden>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Hidden smDown>
                                <Menu auth={auth} onLogoutClick={onLogoutClick}/>
                            </Hidden>
                        </Grid>
                        <Grid item>
                            {auth.isAuth
                                ? <ButtonGroup variant="contained" color="primary"
                                               aria-label="contained primary button group">
                                    <Button onClick={onLogoutClick} color="secondary" component={RouterLink}
                                            to="/">Выйти</Button>
                                </ButtonGroup>
                                : <ButtonGroup variant="contained" color="primary"
                                               aria-label="contained primary button group">
                                    <Button component={RouterLink} to="/login">Вход</Button>
                                    <Button color="secondary" component={RouterLink} to="/">Регистрация</Button>
                                </ButtonGroup>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </div>
        </AppBar>
    )
}