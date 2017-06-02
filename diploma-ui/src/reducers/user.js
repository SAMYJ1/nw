import createReducer from '../utils/createReducer';
import { notification } from 'antd';
import { URL_LOGIN, URL_RESET_PASSWORD, URL_MODIFY_PASSWORD, URL_GET_ADMIN_MESSAGE, URL_DELETE_MESSAGE } from '../utils/constants';
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

export const RESET_PASSWORD_LOAD = 'USER.RESET_PASSWORD_LOAD';
export const RESET_PASSWORD_SUC = 'USER.RESET_PASSWORD_SUC';
export const RESET_PASSWORD_ERR = 'USER.RESET_PASSWORD_ERR';

export const GET_ADMIN_MESSAGE_LOAD = 'USER.GET_ADMIN_MESSAGE_LOAD';
export const GET_ADMIN_MESSAGE_SUC = 'USER.GET_ADMIN_MESSAGE_SUC';
export const GET_ADMIN_MESSAGE_ERR = 'USER.GET_ADMIN_MESSAGE_ERR';

export const DELETE_MESSAGE_LOAD = 'USER.DELETE_MESSAGE_LOAD';
export const DELETE_MESSAGE_SUC = 'USER.DELETE_MESSAGE_SUC';
export const DELETE_MESSAGE_ERR = 'USER.DELETE_MESSAGE_ERR';

const initialState = {
    loading: false,
    modalFlag: false,
    account: undefined,
    character: undefined,
    loadingPasswordRibbon:false,
    loadingLogin: false,
    messageList: [],
};

const onLoading = (state= initialState, action)=>{
    return {...state, loading: true, modalFlag: false, };
};

const onBackendError = (state=initialState, action)=>{
    return {...state, loading: false}
};

const onLoadSavedUser = (state =initialState, action)=>{
    return {...state}
};

const onLogout = (state=initialState, action)=>{
    delCookie("JSESSIONID");
    return {...state, account:undefined, character:undefined}
};

const onLoginSuc = (state= initialState, action)=>{
    let result = action.result;
    if(!result){
        notification.error({
            message: 'Error',
            description: "没有数据返回",
        });
    }
    let reqData = action.action;
    console.log('login!',reqData)
    return {...state, loading: false, account: reqData.account, character:reqData.character , modalFlag:true }
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

let onGetAdminMessageLoad = (state=initialState,actionObj)=> {
    return {...state}
};
let onGetAdminMessageSuc = (state=initialState,actionObj)=> {
    let messageList = actionObj.result.data;
    return {...state, messageList}
};
let onGetAdminMessageErr = (state=initialState,actionObj)=> {
    return {...state}
};

let onDeleteMessageLoad = (state=initialState,actionObj)=> {
    return {...state}
};
let onDeleteMessageSuc = (state=initialState,actionObj)=> {
    return {...state}
};
let onDeleteMessageErr = (state=initialState,actionObj)=> {
    return {...state}
};

let onResetPasswordLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onResetPasswordSuc = (state=initialState, actionObj)=>{
    return {...state}
};
let onResetPasswordErr = (state=initialState, actionObj)=>{
    return {...state}
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

    [GET_ADMIN_MESSAGE_LOAD]: onGetAdminMessageLoad,
    [GET_ADMIN_MESSAGE_SUC]: onGetAdminMessageSuc,
    [GET_ADMIN_MESSAGE_ERR]: onGetAdminMessageErr,

    [DELETE_MESSAGE_LOAD]: onDeleteMessageLoad,
    [DELETE_MESSAGE_SUC]: onDeleteMessageSuc,
    [DELETE_MESSAGE_ERR]: onDeleteMessageErr,

    [RESET_PASSWORD_LOAD]: onResetPasswordLoad,
    [RESET_PASSWORD_SUC]: onResetPasswordSuc,
    [RESET_PASSWORD_ERR]: onResetPasswordErr,
};

export default createReducer(initialState, actionHandlers);

export function login(action) {

    return {
        types: [LOADING, ON_LOGIN_SUC,BACKEND_ERR],
        promise: request.get(URL_LOGIN).send({...action}),
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
        promise: request.get(URL_MODIFY_PASSWORD).send(action),
        action
    }
}

export function resetPassword(action) {
    return {
        types: [RESET_PASSWORD_LOAD, RESET_PASSWORD_SUC, RESET_PASSWORD_ERR],
        promise: request.get(URL_RESET_PASSWORD).send(action),
        action
    }
}

export function getAdminMessage(action) {
    return {
        types: [GET_ADMIN_MESSAGE_LOAD, GET_ADMIN_MESSAGE_SUC, GET_ADMIN_MESSAGE_ERR],
        promise: request.get(URL_GET_ADMIN_MESSAGE).send(action),
        action
    }
}
export function deleteMessage(action) {
    return {
        types: [DELETE_MESSAGE_LOAD, DELETE_MESSAGE_SUC, DELETE_MESSAGE_ERR],
        promise: request.post(URL_DELETE_MESSAGE).send(action),
        action
    }
}