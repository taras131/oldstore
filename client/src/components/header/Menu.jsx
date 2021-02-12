import React from 'react';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import {Button, ButtonGroup, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export const Menu = ({auth, onLogoutClick}) => {
    const classes = useStyles();
    return (
        <div >
            {auth.isAuth
                ? <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button component={RouterLink} to="/catalog">Каталог</Button>
                    <Button component={RouterLink} to={`/catalog/${auth.userId}`}>Мои объявления</Button>
                    <Button component={RouterLink} to="/users">Люди</Button>
                    <Button component={RouterLink} to="/order">Заказы</Button>
                </ButtonGroup>
                : <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button component={RouterLink} to="/catalog">Каталог</Button>
                </ButtonGroup>}
        </div>
    )
}