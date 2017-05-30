import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import {Router, Route, IndexRedirect, browserHistory,hashHistory} from 'react-router';
import reducers from '../reducers/index';
import SagaManager from '../sagas/SagaManager';
import './index.less';
import 'antd/dist/antd.css';

import {getCookie} from '../utils';
import promiseMiddleware  from '../utils/promiseMiddleware';
import loggerMiddleware from '../utils/loggerMiddleware';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import App from '../views/App';
import Home from '../views/Home';

// import Login from '../views/Login';

//////////////////////
// Store

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancer = compose(
  applyMiddleware(promiseMiddleware,sagaMiddleware,loggerMiddleware ),

  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(combineReducers({
  reducers, routing,
}), initialState, enhancer);
SagaManager.startSagas(sagaMiddleware);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const reducers = require('../reducers');
    const combinedReducers = combineReducers({ reducers, routing });

    store.replaceReducer(combinedReducers);
  });
  module.hot.accept('../sagas/SagaManager', () => {
    SagaManager.cancelSagas(store);
    require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
  });
}

//////////////////////
// Render

const history = syncHistoryWithStore(hashHistory, store);
const validate = function (next, replace, callback) {
  const isLoggedIn = !!getCookie('JSESSIONID');
  if (!isLoggedIn && next.location.pathname !== '/login') {
    replace('/login')
  }
  console.log('cookie!!!!!!!!!!!!!!', isLoggedIn, next)
  callback()
};


let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
          <Route path="/"  breadcrumbName="Home" onEnter={validate} >
            <IndexRedirect to="home" />
            {/*<Route path="login" component={Login}/>*/}
            <Route component={App}>
              <Route path="home"  component={Home}/>

              <Route path="*" component={Home}/>
            </Route>
          </Route>
      </Router>
    </Provider>
  , document.getElementById('root'));
};


if (module.hot) {
  const renderNormally = render;
  const renderException = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      console.error('error', error);
      renderException(error);
    }
  };

}

render();
