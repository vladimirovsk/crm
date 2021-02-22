import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Copyright from '../../Copyright/Copyright';
import CircularProgress from '@material-ui/core/CircularProgress';
//import {useHistory} from 'react-router-dom';
import AlertContext from 'contexts/alert/alertContext'

import {useSelector, useDispatch} from 'react-redux';
import {useAuth} from '../../../contexts/AuthContext';

//const clientId = '87725660702-b1fjhbt1fo8ki5isi2ebbbietgjkjond.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selLogin = useSelector((state)=>state.login);
  const {login, currentUser} = useAuth();
  const [error, setError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  //const history = useHistory();
  const {show} = useContext(AlertContext);
  
  //console.log(selLogin)
  async function handleSubmit(e){
    //console.log("submit", email, password);
    //if (passwordRef.current.value !==)
    e.preventDefault();
    try{
      setError('');
      setLoading(true);
      await login( email, password);
      setLoading(false)
      //history.push('/');
    } catch (e) {
      setError('Invalid Login/Email or Password, '+e.message);
      show(e.message, "error", 5000)
    }
    
  }
  // React.useEffect(()=>{
  //   if (error){
  //   show(error, "error", 5000)
  //   }
  //   return ()=>setError('')
  // },[error])

  const handleCloseLogin = () => {
      dispatch({type: 'OPEN_SIGNUP'});
  }

  const handleOpenForeg = () => {
    dispatch({type: 'OPEN_FOREG'});
}
  return(
    <React.Fragment>
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {currentUser&& currentUser.email}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {email}
              onChange = {e=>setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {password}
              onChange = {e=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
              {loading && <CircularProgress disableShrink size={"1rem"} className={classes.buttonProgress}/>}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleOpenForeg}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleCloseLogin}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

    </React.Fragment>
  )

}

export default Login;