import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import Home from './component/pages/Home/Home';
import Login from './component/pages/Login/Login';
import Profile from './component/pages/Profile/Profile';
import Header from './component/Header/Header'

function App(props) {



  console.log('App props', props);
  const routes = (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/home" component={Home} />
      <Route exact={true} path="/login" render = {()=><Login />} />
      <Route exact={true} path="/profile" component={Profile} />
      <Redirect to='/home' />
    </Switch>
  );

  return (
    <div className="App">
    <Header />  
    {routes}
    </div>
  );
}

export default App;
