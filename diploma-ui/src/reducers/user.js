import createReducer from '../utils/createReducer';
import { notification } from 'antd';
import { URL_LOGIN, URL_RESET_PASSWORD } from '../utils/constants';
import { delCookie } from '../utils';
import request from '../utils/fetchRequest';



export const LOADING = 'USER.LOADING';
export const BACKEND_ERR = 'USER.BACKEND_ERR';
export const ON_LOAD_SAVED_USER = 'USER.ON_LOAD_SAVED_USER';
export const ON_LOGIN_SUC = 'USER.ON_LGIN_SUC';
export const ON_LOGOUT = 'USER.ON_LOGOUT';

export const LOADING_PASSWORD="USER.LOADING_PASSWORD";
export const ON_RESET_PASSWORD_SUCCESS="USER.ON_RESET_PASSWORD_SUCCESS";
export const PASSWORD_BACKEND_ERROR="USER.PASSWORD_BACKEND_ERROR";


const initialState = {
    loading: false,
    id: undefined,
    modalFlag: false,
    userCode: undefined,
    userName: undefined,
    loadingPasswordRibbon:false,
};

const onLoading = (state= initialState, action)=>{
    return {...state, loading: true, modalFlag: false};
};

const onBackendError = (state=initialState, action)=>{
    return {...state, loading: false}
};

const onLoadSavedUser = (state =initialState, action)=>{
    return {...state}
};

const onLogout = (state=initialState, action)=>{
    delCookie("JSESSIONID");
    return {...state, id: undefined, userCode:undefined, userName:undefined}
};

const onLoginSuc = (state= initialState, action)=>{
    let result = action.result;
    if(!result){
        notification.error({
            message: 'Error',
            description: "没有数据返回",
        });
    }
    return {...state, loading: false, ...result, id: result.userId, modalFlag:true }
};

let onLoadingPassword = (state = initialState, action) =>{
    return {...state, loadingPasswordRibbon: true, };
};

let onResetPasswordSuccess = (state = initialState, action) =>{
    return {...state, loadingPasswordRibbon: false, };
};

let onPasswordError = (state = initialState, action) =>{
    return {...state, loadingPasswordRibbon: false, };
};


const actionHandlers = {
    [LOADING]: onLoading,
    [BACKEND_ERR]: onBackendError,
    [ON_LOAD_SAVED_USER]: onLoadSavedUser,
    [ON_LOGOUT]: onLogout,
    [ON_LOGIN_SUC]: onLoginSuc,

    [LOADING_PASSWORD]: onLoadingPassword,
    [ON_RESET_PASSWORD_SUCCESS]: onResetPasswordSuccess,
    [PASSWORD_BACKEND_ERROR]: onPasswordError,

};

export default createReducer(initialState, actionHandlers);

export function login(action) {

    return {
        types: [LOADING, ON_LOGIN_SUC,BACKEND_ERR],
        promise: request.post(URL_LOGIN).send({...action}),
        action
    }
}

export function logout(action) {
    return {
        type: ON_LOGOUT,
        action
    }
}

export function sendPassword(action) {
    return {
        types: [LOADING_PASSWORD, ON_RESET_PASSWORD_SUCCESS, PASSWORD_BACKEND_ERROR],
        promise: request.post(URL_RESET_PASSWORD).send(action),
        action
    }
}