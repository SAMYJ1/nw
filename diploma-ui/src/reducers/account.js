import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_ACCOUNT_LIST, URL_MODIFY_ACCOUNT, URL_DEL_ACCOUNT } from '../utils/constants';

const GET_ACCOUNT_LIST_LOAD = 'ACCOUNT.GET_ACCOUNT_LIST_LOAD';
const GET_ACCOUNT_LIST_SUC = 'ACCOUNT.GET_ACCOUNT_LIST_SUC';
const GET_ACCOUNT_LIST_ERR = 'ACCOUNT.GET_ACCOUNT_LIST_ERR';

const MODIFY_ACCOUNT_LOAD = 'ACCOUNT.MODIFY_ACCOUNT_LOAD';
const MODIFY_ACCOUNT_SUC = 'ACCOUNT.MODIFY_ACCOUNT_SUC';
const MODIFY_ACCOUNT_ERR = 'ACCOUNT.MODIFY_ACCOUNT_ERR';

const DELETE_ACCOUNT_LOAD = 'ACCOUNT.DELETE_ACCOUNT_LOAD';
const DELETE_ACCOUNT_SUC = 'ACCOUNT.DELETE_ACCOUNT_SUC';
const DELETE_ACCOUNT_ERR = 'ACCOUNT.DELETE_ACCOUNT_ERR';

const initialState={
    accountList: [],
    loading: false,
    reload: false,
};

let onGetAccountListLoad = (state=initialState, actionObj)=>{
    return {...state, loading:true};
};
let onGetAccountListSuc = (state=initialState, actionObj)=>{
    let accountList = actionObj.result.data;

    return {...state, loading: false, accountList};
};
let onGetAccountListErr = (state=initialState, actionObj)=>{
    return {...state, loading:false};
};
let onModifyAccountLoad = (state=initialState, actionObj)=>{
    return {...state, reload:false}
};
let onModifyAccountSuc = (state=initialState, actionObj)=>{

    return {...state, reload: true}
};
let onModifyAccountErr = (state=initialState, actionObj)=>{
    return {...state, reload: false}
};
let onDelAccountLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onDelAccountSuc = (state=initialState, actionObj)=>{
    let accountList = state.accountList;
    let rmIdx = accountList.findIndex(item=>item.id === actionObj.action.id);
    accountList.splice(rmIdx, 1);
    return {...state, accountList}
};
let onDelAccountErr = (state=initialState, actionObj)=>{
    return {...state}
};


const actionHandlers = {
    [GET_ACCOUNT_LIST_LOAD]: onGetAccountListLoad,
    [GET_ACCOUNT_LIST_SUC]: onGetAccountListSuc,
    [GET_ACCOUNT_LIST_ERR]: onGetAccountListErr,
    [MODIFY_ACCOUNT_LOAD]: onModifyAccountLoad,
    [MODIFY_ACCOUNT_SUC]: onModifyAccountSuc,
    [MODIFY_ACCOUNT_ERR]: onModifyAccountErr,
    [DELETE_ACCOUNT_LOAD]: onDelAccountLoad,
    [DELETE_ACCOUNT_SUC]: onDelAccountSuc,
    [DELETE_ACCOUNT_ERR]: onDelAccountErr,
};

export default createReducer(initialState, actionHandlers);

export function getAccountList(action) {
    return {
        types: [GET_ACCOUNT_LIST_LOAD,GET_ACCOUNT_LIST_SUC,GET_ACCOUNT_LIST_ERR],
        promise: request.post(URL_GET_ACCOUNT_LIST).send(action),
        action
    }
}

export function modifyAccount(action) {
    return {
        types: [MODIFY_ACCOUNT_LOAD,MODIFY_ACCOUNT_SUC,MODIFY_ACCOUNT_ERR],
        promise: request.post(URL_MODIFY_ACCOUNT).send(action),
        action
    }
}
export function deleteAccount(action) {
    return {
        types: [DELETE_ACCOUNT_LOAD,DELETE_ACCOUNT_SUC,DELETE_ACCOUNT_ERR],
        promise: request.post(URL_DEL_ACCOUNT).send(action),
        action
    }
}