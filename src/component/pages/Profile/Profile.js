import React, {useContext} from 'react'
import {TextField, Container, Avatar, Typography, Grid, CircularProgress, Button, InputAdornment, IconButton, Divider} from '@material-ui/core';
import {useAuth} from '../../../contexts/AuthContext';
import PersonIcon from '@material-ui/icons/Person';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AlertContext from 'contexts/alert/alertContext';

 
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

function Profile () {
  const classes = useStyles();
  const {currentUser, updateEmail, updatePassword} = useAuth();
  const [email, setEmail] = React.useState(currentUser.email);
  const [emailVerified, setEmailVerified] = React.useState(currentUser.emailVerified);
  const [phoneNumber, setPhoneNumber] = React.useState(currentUser.phoneNumber||'');
  const [displayName, setDisplayName] =  React.useState(currentUser.displayName||'NaN');
  const [photoURL, setPhotoURL] =  React.useState(currentUser.photoURL);
  const [password, setPassword] =  React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [verificat, setVerificat] = React.useState(false);
  const [confirmPassword, setConfirmPassword] =  React.useState('');
  const [error, setError] = React.useState('');
  const {show} = useContext(AlertContext);

  
  function handleSubmit(e){
    e.preventDefault();
    
    setLoading(true);
    const promises = [];
    if (email !== currentUser.email){
      promises.push(updateEmail(email))
    }
    if (password){
      promises.push(updatePassword(password))
    }
    Promise.all(promises).then(()=>{
      show('Update account success', "success", 5000);
    }).catch(()=>{
      setError('Filed to update account');
      show('Filed to update account', "error", 5000);
    }).finally(()=>{
      
      setLoading(false)
    
    })
    
  }  

  React.useEffect(()=>{
    if ((password === confirmPassword)&&password.length>4){
      setVerificat(true)
    } else {
      setVerificat(false)
    }
  }, [password, confirmPassword])

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h5" style={{marginTop:'5em'}}>PROFILE {currentUser.displayName}</Typography>
       <Avatar className={classes.avatar}>
            <PersonIcon />
      </Avatar>
       <img src={photoURL} alt='' />

      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
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
              InputProps = {{
                endAdornment:(<InputAdornment position="end">
                  <IconButton style={{color:'red'}}>
                    <CheckBoxIcon />
                  </IconButton>
                  </InputAdornment>)
              }}  
            />

        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone number"
              name="phone"
              type="number"
              autoFocus
              value = {phoneNumber}
              onChange = {e=>setPhoneNumber(e.target.value)}
              
              InputProps = {{
                className:'digitsOnly',
                endAdornment:(<InputAdornment position="end">
                  <IconButton style={{color:'red'}}>
                    <CheckBoxIcon />
                  </IconButton>
                  </InputAdornment>)
              }}  
            />
        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value = {password}
                onChange = {e=>setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
            />
          </Grid>
          <Grid item xs={12} sm={12}>    
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value = {confirmPassword}
                onChange = {e=>setConfirmPassword(e.target.value)}
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
            />
          </Grid>  
      </Grid>
      <Button
            disabled={!verificat}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
          >
            {"Save"}
            {loading && <CircularProgress disableShrink size={"1rem"} className={classes.buttonProgress}/>}
          </Button>
      </form>  
     
    </Container>
  )
}

export default Profile;