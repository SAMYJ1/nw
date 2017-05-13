import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import SagaManager from './sagas/SagaManager';
import promiseMiddleware  from './utils/promiseMiddleware'
import loggerMiddleware from './utils/loggerMiddleware';
import reducers from './reducers/index';
import App from './view/App/index';


// const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,loggerMiddleware )(createStore);

const store = createStoreWithMiddleware(reducers,initialState)
// SagaManager.startSagas(sagaMiddleware);


class Root extends Component{

    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default Root;