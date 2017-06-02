import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_NOTICE_LIST, URL_MODIFY_NOTICE, URL_DEL_NOTICE } from '../utils/constants';

const GET_NOTICE_LIST_LOAD = 'NOTICE.GET_NOTICE_LIST_LOAD';
const GET_NOTICE_LIST_SUC = 'NOTICE.GET_NOTICE_LIST_SUC';
const GET_NOTICE_LIST_ERR = 'NOTICE.GET_NOTICE_LIST_ERR';

const ADD_NOTICE_LOAD = 'NOTICE.ADD_NOTICE_LOAD';
const ADD_NOTICE_SUC = 'NOTICE.ADD_NOTICE_SUC';
const ADD_NOTICE_ERR = 'NOTICE.ADD_NOTICE_ERR';

const DELETE_NOTICE_LOAD = 'NOTICE.DELETE_NOTICE_LOAD';
const DELETE_NOTICE_SUC = 'NOTICE.DELETE_NOTICE_SUC';
const DELETE_NOTICE_ERR = 'NOTICE.DELETE_NOTICE_ERR';

const initialState = {
    loading: false,
    noticeList: [],
    saved: false
};

let onGetNoticeListLoad = (state=initialState, actionObj)=>{
    return {...state, loading: true}
};
let onGetNoticeListSuc = (state=initialState, actionObj)=>{
    let noticeList = actionObj.result.data;
    return {...state, loading: false, noticeList}
};
let onGetNoticeListErr = (state=initialState, actionObj)=>{
    return {...state, loading: false}
};
let onDelNoticeLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onDelNoticeSuc = (state=initialState, actionObj)=>{
    let noticeList = state.noticeList;
    let rmIdx = noticeList.findIndex(item=>item.id === actionObj.action.id);
    noticeList.splice(rmIdx, 1);
    return {...state, noticeList}
};
let onDelNoticeErr = (state=initialState, actionObj)=>{
    return {...state}
};

let onAddNoticeLoad = (state= initialState, actionObj)=>{
    return {...state, reload: false, saved:false}
};
let onAddNoticeSuc = (state= initialState, actionObj)=>{

    return {...state, reload: true, saved: true}
};
let onAddNoticeErr = (state= initialState, actionObj)=>{
    return {...state, reload: false, saved: false}
};


const actionHandlers = {
    [GET_NOTICE_LIST_LOAD]: onGetNoticeListLoad,
    [GET_NOTICE_LIST_SUC]: onGetNoticeListSuc,
    [GET_NOTICE_LIST_ERR]: onGetNoticeListErr,
    [ADD_NOTICE_LOAD]: onAddNoticeLoad,
    [ADD_NOTICE_SUC]: onAddNoticeSuc,
    [ADD_NOTICE_ERR]: onAddNoticeErr,
    [DELETE_NOTICE_LOAD]: onDelNoticeLoad,
    [DELETE_NOTICE_SUC]: onDelNoticeSuc,
    [DELETE_NOTICE_ERR]: onDelNoticeErr,
};
export default createReducer(initialState, actionHandlers);

export function getNoticeList(action) {
    return {
        types: [GET_NOTICE_LIST_LOAD, GET_NOTICE_LIST_SUC, GET_NOTICE_LIST_ERR],
        promise: request.get(URL_GET_NOTICE_LIST).send(action),
        action
    }
}
export function addNotice(action) {
    return {
        types: [ADD_NOTICE_LOAD, ADD_NOTICE_SUC, ADD_NOTICE_ERR],
        promise: request.post(URL_MODIFY_NOTICE).send(action),
        action
    }
}


export function deleteNotice(action) {
    return {
        types: [DELETE_NOTICE_LOAD,DELETE_NOTICE_SUC,DELETE_NOTICE_ERR],
        promise: request.get(URL_DEL_NOTICE).send(action),
        action
    }
}