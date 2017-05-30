import request from '../utils/fetchRequest';
import createReducer from '../utils/createReducer';
import { URL_GET_COURSEINFO_LIST } from '../utils/constants';

const GET_COURSEINFO_LIST_LOAD = 'COURSE.GET_COURSEINFO_LIST_LOAD';
const GET_COURSEINFO_LIST_SUC = 'COURSE.GET_COURSEINFO_LIST_SUC';
const GET_COURSEINFO_LIST_ERR = 'COURSE.GET_COURSEINFO_LIST_ERR';

const initialState = {
    loading: false,
    courseData: [],
};

let onGetCourseInfoListLoad = (state=initialState, actionObj)=>{
    return {...state, loading:true}
};
let onGetCourseInfoListSuc = (state=initialState, actionObj)=>{
    let courseData = actionObj.result.data;
    return {...state, loading:false, courseData}
};
let onGetCourseInfoListErr = (state=initialState, actionObj)=>{
    return {...state, loading:false}
};

const actionHandlers = {
    [GET_COURSEINFO_LIST_LOAD]: onGetCourseInfoListLoad,
    [GET_COURSEINFO_LIST_SUC]: onGetCourseInfoListSuc,
    [GET_COURSEINFO_LIST_ERR]: onGetCourseInfoListErr,
};

export default createReducer(initialState, actionHandlers);

export function getCourseInfoList(action) {
    return {
        types: [GET_COURSEINFO_LIST_LOAD, GET_COURSEINFO_LIST_SUC, GET_COURSEINFO_LIST_ERR],
        promise: request.get(URL_GET_COURSEINFO_LIST).send(action),
        action
    }
}