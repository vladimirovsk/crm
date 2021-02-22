import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import Sign from './component/pages/SigIn/Sign';
import Login from './component/pages/Login/Login';
import SignUp from './component/pages/SignUp/SignUp';
import Profile from './component/pages/Profile/Profile';
import Header from './component/Header/Header';
import ProtectedRoute from './ProtectedRoute';

import MyAlert from 'component/MyAlert/MyAlert';
import AlertState from 'contexts/alert/alertState';
import Dashboard from 'component/pages/Dashboard/Dashboard';
//import { useSelector} from 'react-redux';
import {useAuth} from 'contexts/AuthContext';
import { withRouter } from 'react-router-dom';



const App =(props) => {

  const {currentUser} = useAuth();


  const routes = (
    <Switch>
      {/* <Route exact={true} path="/" component={Home} /> */}
      {currentUser ?<Route exact path='/' /> :<Route exact={true} path="/sign" component={Sign} />}
      {/* <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/signup" component={SignUp} /> */}
      {/* <ProtectedRoute path="/profile" component={Profile} /> */}
      <ProtectedRoute  exact={true} currentUser={currentUser} path='/' component={Dashboard} />
      <ProtectedRoute exact={true} currentUser={currentUser} path='/profile' component={Profile} />
    </Switch>
  );

  return (
    <div className="App">
    <AlertState>
        <MyAlert /> 
        {currentUser ? <Header />: null}
        {routes}
    </AlertState>
    </div>
  );
}

export default withRouter(App);


