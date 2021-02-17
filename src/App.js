import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import Home from './component/pages/Home/Home';
import Login from './component/pages/Login/Login';
import SignUp from './component/pages/SignUp/SignUp';
import Profile from './component/pages/Profile/Profile';
import Header from './component/Header/Header';
import ProtectedRoute from './ProtectedRoute';

//import { useSelector} from 'react-redux';



const App =(props) => {
  const [isAuth, setIsAuth] = React.useState(false);

  function logout(){
    setIsAuth(false)
  }

  const routes = (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/home" component={Home} />
      {/* <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/signup" component={SignUp} /> */}
      <ProtectedRoute isAuth ={isAuth} logout={logout} path="/profile" component={Profile} />
      <Redirect to='/home' />
    </Switch>
  );

  return (
    <div className="App">
    {isAuth ? <Header /> : null}
    {routes}
    </div>
  );
}

export default App;
