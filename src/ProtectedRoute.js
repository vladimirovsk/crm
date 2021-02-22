import React from 'react';
import {Route, Redirect} from 'react-router-dom';
//import {useAuth} from 'contexts/AuthContext';

function ProtectedRoute({ component: Component, currentUser: currentUser,  ...rest}) {
  //const {currentUser} = useAuth();
  //console.log('currentUser',currentUser);
  return (
    <Route
    {...rest}
    render = {(props) => {
      return currentUser ? <Component {...props} /> : <Redirect to='/sign' />
    }}
    />
  )
}


export default ProtectedRoute;