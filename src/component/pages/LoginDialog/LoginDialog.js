import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from 'react-redux';
import {AUTH_SUCCESS, HIDE_LOGIN} from '../../../store/action/actionTypes';



const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    hide: {
      display: 'none',
    },
    //backgroundColor: '#fff', //theme.palette.common.primary''
    paddingTop: theme.spacing(1)
  }
}));

const Login = (props) => {
  const classes = useStyles(); 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const myStateLogin= useSelector((state) => state.login);
  const dispatch = useDispatch();
  

 function handleLogin(props)  {
    dispatch({type: AUTH_SUCCESS})
    handleCloseLogin()
}

  const handleCloseLogin = () =>{
   dispatch({type: HIDE_LOGIN})
   setOpenLogin(false);
  }

  React.useEffect(()=>{
    setOpenLogin(myStateLogin.formOpen);
  }, [myStateLogin.formOpen])


  return (
    <Dialog 
       open={openLogin}
   
      onClose={handleCloseLogin}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={null}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >            
    <DialogTitle id="confirmation-dialog-title">{"Login"}</DialogTitle>
    <DialogContent dividers>
    <DialogContentText id="confirmation-dialog-description">   
    </DialogContentText>

    <TextField
        className={classes.textField}
        id="login"
        label={'Enter your email'}
        margin="dense"
        type="email"
        //autoComplete="current-email"
        //variant="outlined"
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}

    />
    <TextField
        className={classes.textField}
        //disabled={false}
        autoFocus
        margin="dense"
        id="password"
        label={'Enter your password'}
        type="password"
        //autoComplete="current-password"
        //variant="outlined"
        fullWidth
        value={password}
        onChange={e => setPassword(e.target.value)}
    />

</DialogContent>

<DialogActions>
    <Button onClick={handleCloseLogin}
            //color="secondary" 
            variant="outlined"
            >
            {"Cancel"}
    </Button>
    <Button disabled={false}
            onClick={(event) => handleLogin(event)}
            //color="secondary" 
            variant="outlined">
            {"Login"}
            {loading && <CircularProgress disableShrink size={24} className={classes.buttonProgress}/>}
    </Button>
    

</DialogActions>


</Dialog>
  )
}




export default Login;