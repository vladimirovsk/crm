import React from 'react';
import {Avatar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useSelector, useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";

import {useAuth} from '../../../contexts/AuthContext';
import AlertContext from 'contexts/alert/alertContext'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  SignUp =(props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selLogin = useSelector((state)=>state.login)
  // const emailRef = React.useRef();
  // const passwordRef = React.useRef();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signup, currentUser } = useAuth();
  const history = useHistory();
  const {show} = React.useContext(AlertContext);

  const errorRef = React.useRef(error);

  const handleOpenLogin = () =>{
    dispatch({type: 'OPEN_LOGIN'})
  }

  async function handleSubmit(e){
    
    //console.log("submit", email, password);
    //if (passwordRef.current.value !==)
    e.preventDefault();
    try{
      setError('');
      setLoading(true);
      await signup( email, password)
      dispatch({type: 'OPEN_LOGIN'})

    } catch (e) {

      setError((prevError)=>{return prevError+"1"})
      errorRef.current = 'Failed to create an account, '+e.message;
      setError(errorRef.current);
      show(errorRef.current, "error", 5000)
    }
    setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {currentUser && currentUser.email}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* FirstName */}
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* LastName */}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
            {/* Email */}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {email}
                onChange = {e=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Password */}
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {password}
                onChange = {e=>setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
          >
            {"Sign Up"}
            {loading && <CircularProgress disableShrink size={"1rem"} className={classes.buttonProgress}/>}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleOpenLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      {/* {error && <Alert variant="outlined"  severity="error">{error}</Alert>} */}
    </Container>
  );
}

export default SignUp;