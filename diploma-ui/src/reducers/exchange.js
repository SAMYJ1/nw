import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_COMMENT_LIST, URL_ADD_COMMENT, URL_ADD_REPLY  } from '../utils/constants';

const GET_COMMENT_LIST_LOAD = 'EXCHANGE.GET_COMMENT_LIST_LOAD';
const GET_COMMENT_LIST_SUC = 'EXCHANGE.GET_COMMENT_LIST_SUC';
const GET_COMMENT_LIST_ERR = 'EXCHANGE.GET_COMMENT_LIST_ERR';

const ADD_COMMENT_LOAD = 'EXCHANGE.ADD_COMMENT_LOAD';
const ADD_COMMENT_SUC = 'EXCHANGE.ADD_COMMENT_SUC';
const ADD_COMMENT_ERR = 'EXCHANGE.ADD_COMMENT_ERR';

const ADD_REPLY_LOAD = 'EXCHANGE.ADD_REPLY_LOAD';
const ADD_REPLY_SUC = 'EXCHANGE.ADD_REPLY_SUC';
const ADD_REPLY_ERR = 'EXCHANGE.ADD_REPLY_ERR';

const initialState = {
    commentList: []
};

let onGetCommentListLoad = (state,actionObj)=>{
    return {...state}
};
let onGetCommentListSuc = (state,actionObj)=>{
    let commentList = actionObj.result.data;
    return {...state, commentList}
};
let onGetCommentListErr = (state,actionObj)=>{
    return {...state}
};

let onAddCommentLoad = (state,actionObj)=>{
    return {...state}
};
let onAddCommentSuc = (state,actionObj)=>{
    return {...state}
};
let onAddCommentErr = (state,actionObj)=>{
    return {...state}
};

let onAddReplyLoad = (state,actionObj)=>{
    return {...state}
};
let onAddReplySuc = (state,actionObj)=>{
    return {...state}
};
let onAddReplyErr = (state,actionObj)=>{
    return {...state}
};

const actionHandlers = {
    [GET_COMMENT_LIST_LOAD]: onGetCommentListLoad,
    [GET_COMMENT_LIST_SUC]: onGetCommentListSuc,
    [GET_COMMENT_LIST_ERR]: onGetCommentListErr,
    [ADD_COMMENT_LOAD]: onAddCommentLoad,
    [ADD_COMMENT_SUC]: onAddCommentSuc,
    [ADD_COMMENT_ERR]: onAddCommentErr,
    [ADD_REPLY_LOAD]: onAddReplyLoad,
    [ADD_REPLY_SUC]: onAddReplySuc,
    [ADD_REPLY_ERR]: onAddReplyErr,
};

export default createReducer(initialState, actionHandlers);

export function getCommentList(action) {
    return {
        types: [GET_COMMENT_LIST_LOAD,GET_COMMENT_LIST_SUC,GET_COMMENT_LIST_ERR],
        promise: request.post(URL_GET_COMMENT_LIST).send(action),
        action
    }
}

export function addComment(action) {
    return {
        types: [ADD_COMMENT_LOAD,ADD_COMMENT_SUC,ADD_COMMENT_ERR],
        promise: request.post(URL_ADD_COMMENT).send(action),
        action
    }
}

export function addReply(action) {
    return {
        types: [ADD_REPLY_LOAD,ADD_REPLY_SUC,ADD_REPLY_ERR],
        promise: request.post(URL_ADD_REPLY).send(action),
        action
    }
}