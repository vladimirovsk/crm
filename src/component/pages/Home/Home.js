import React from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Grid, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backImg from '../../../img/backnew.png';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import {useSelector} from 'react-redux';
import Copyright from '../../Copyright/Copyright'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: `url(${backImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

}));

export default function SignInSide(props) {
  const selLogin =useSelector((state)=>state.login);
  const [newUser, setNewUser] = React.useState(false);
  const classes = useStyles();

  React.useEffect(()=>{
    setNewUser(selLogin.openLogin)
  }, [selLogin.openLogin, selLogin.openSignUp])


  //const handle
  return (
    <React.Fragment>
    <Grid container 
      component="main" className={classes.root}>
      <CssBaseline />

      <Grid 
   
        item xs={false} sm={4} md={7} className={classes.image}>
        <Box style={{
          position: "fixed", 
          bottom: "1em", 
          right: "20px", 
          display: "block", 
        }}>
        <Copyright />
      </Box>
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        {newUser ?<Login />:<SignUp />}
      </Grid>
    </Grid>

   </React.Fragment>   
  );
}