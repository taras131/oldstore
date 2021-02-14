import React, {useContext, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useMessage} from "../../hooks/message.hook";

export const Message = ({message}) => {
    const [open, setOpen] = React.useState(false);
    const vertical= 'top'
    const horizontal= 'right'
    useEffect(()=>{
        setOpen(true)
        setTimeout(()=>{
            setOpen(false)
        },5000)
    },[message])
    console.log("Сообщение:",message)
    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                message={message}
                key={vertical + horizontal}
            />
        </div>
    );
}