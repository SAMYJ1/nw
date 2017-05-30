import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import {URL_LOGIN} from '../utils/constants';


const LOGIN_LOAD = 'USER.LOGIN_LOAD';
const LOGIN_SUC = 'USER.LOGIN_SUC';
const LOGIN_ERR = 'USER.LOGIN_ERR';


const initialState = {
    isLogin: false,
    account: '',
    character: '',
};

let onLoginLoad = (state=initialState, actionObj)=>{
    return {...state, isLogin: false}
} ;
let onLoginSuc = (state=initialState, actionObj)=>{
    let {account, character} = actionObj.action;
    return {...state, isLogin: true, account, character}
} ;
let onLoginErr = (state=initialState, actionObj)=>{
    return {...state, isLogin: false}
} ;


const actionHandlers = {
    [LOGIN_LOAD]: onLoginLoad,
    [LOGIN_SUC]: onLoginSuc,
    [LOGIN_ERR]: onLoginErr,
};
export default createReducer(initialState,actionHandlers);

export function login(action) {
    return {
        types: [LOGIN_LOAD, LOGIN_SUC, LOGIN_ERR],
        promise: request.get(URL_LOGIN).send(action),
        action
    }
}