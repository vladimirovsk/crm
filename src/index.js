import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import rootReducers from './store/reducers/rootReducers';
import thunk from  'redux-thunk';

//TODO какой из composeEnhancers использовать?
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

// const composeEnhancers = composeWithDevTools({
//   // Specify here name, actionsBlacklist, actionsCreators and other options
// });

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))

const app =(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  app, document.getElementById('root')
);

