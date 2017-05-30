import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_COURSE_INFO_LIST } from '../utils/constants';

const GET_COURSE_INFO_LIST_LOAD = 'COURSE_INFO.GET_COURSE_INFO_LIST_LOAD';
const GET_COURSE_INFO_LIST_SUC = 'COURSE_INFO.GET_COURSE_INFO_LIST_SUC';
const GET_COURSE_INFO_LIST_ERR = 'COURSE_INFO.GET_COURSE_INFO_LIST_ERR';


const initialState = {
    loading: false,
    courseInfoList: []
};


let onGetCourseInfoListLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onGetCourseInfoListSuc = (state=initialState, actionObj)=>{
    let courseInfoList = actionObj.result.data;
    return {...state, courseInfoList}
};
let onGetCourseInfoListErr = (state=initialState, actionObj)=>{
    return {...state}
};

const actionHandlers = {
    [GET_COURSE_INFO_LIST_LOAD]: onGetCourseInfoListLoad,
    [GET_COURSE_INFO_LIST_SUC]: onGetCourseInfoListSuc,
    [GET_COURSE_INFO_LIST_ERR]: onGetCourseInfoListErr,
};

export default createReducer(initialState, actionHandlers);

export function getCourseInfoList(action) {
    return {
        types: [GET_COURSE_INFO_LIST_LOAD,GET_COURSE_INFO_LIST_SUC,GET_COURSE_INFO_LIST_ERR],
        promise: request.get(URL_GET_COURSE_INFO_LIST).send(action),
        action
    }
}