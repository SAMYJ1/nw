import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_COURSE_LIST, URL_MODIFY_COURSE, URL_DELETE_COURSE, URL_GET_COURSE_DETAIL,URU_MODIFY_COURSE_DETAIL  } from '../utils/constants';

const GET_COURSE_LIST_LOAD = 'COURSE.GET_COURSE_LIST_LOAD';
const GET_COURSE_LIST_SUC = 'COURSE.GET_COURSE_LIST_SUC';
const GET_COURSE_LIST_ERR = 'COURSE.GET_COURSE_LIST_ERR';

const MODIFY_COURSE_LOAD = 'COURSE.MODIFY_COURSE_LOAD';
const MODIFY_COURSE_SUC = 'COURSE.MODIFY_COURSE_SUC';
const MODIFY_COURSE_ERR = 'COURSE.MODIFY_COURSE_ERR';

const DELETE_COURSE_LOAD = 'COURSE.DELETE_COURSE_LOAD';
const DELETE_COURSE_SUC = 'COURSE.DELETE_COURSE_SUC';
const DELETE_COURSE_ERR = 'COURSE.DELETE_COURSE_ERR';

const GET_COURSE_DETAIL_LOAD = 'COURSE.GET_COURSE_DETAIL_LOAD';
const GET_COURSE_DETAIL_SUC = 'COURSE.GET_COURSE_DETAIL_SUC';
const GET_COURSE_DETAIL_ERR = 'COURSE.GET_COURSE_DETAIL_ERR';

const MODIFY_COURSE_DETAIL_LOAD = 'COURSE.MODIFY_COURSE_DETAIL_LOAD';
const MODIFY_COURSE_DETAIL_SUC = 'COURSE.MODIFY_COURSE_DETAIL_SUC';
const MODIFY_COURSE_DETAIL_ERR = 'COURSE.MODIFY_COURSE_DETAIL_ERR';

const initialState = {
    loading: false,
    courseList: [],
    reload: false,
    courseDetailData: {},
};

let onGetCourseListLoad = (state=initialState, actionObj)=>{
    return {...state, loading: true};
};
let onGetCourseListSuc = (state=initialState, actionObj)=>{
    let courseList = actionObj.result.data;
    console.info(courseList)
    return {...state, loading: false, courseList};
};
let onGetCourseListErr = (state=initialState, actionObj)=>{
    return {...state, loading: false};
};
let onModifyCourseLoad = (state=initialState, actionObj)=>{
    return {...state, reload: false};
};
let onModifyCourseSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true};
};
let onModifyCourseErr = (state=initialState, actionObj)=>{
    return {...state, reload: false};
};
let onDelCourseLoad = (state=initialState, actionObj)=>{
    return {...state};
};
let onDelCourseSuc = (state=initialState, actionObj)=>{
    let courseList = state.courseList;
    let rmIdx = courseList.findIndex(item=>item.id === actionObj.action.id);
    courseList.splice(rmIdx, 1);
    
    return {...state, courseList};
};
let onDelCourseErr = (state=initialState, actionObj)=>{
    return {...state};
};

let onGetCourseDetailLoad = (state=initialState, actionObj)=>{
    return {...state};
};
let onGetCourseDetailSuc = (state=initialState, actionObj)=>{
    let courseDetailData = actionObj.result.data;
    return {...state, courseDetailData};
};
let onGetCourseDetailErr = (state=initialState, actionObj)=>{
    return {...state};
};

let onModifyCourseDetailLoad = (state=initialState, actionObj)=>{
    return {...state};
};
let onModifyCourseDetailSuc = (state=initialState, actionObj)=>{
    return {...state};
};
let onModifyCourseDetailErr = (state=initialState, actionObj)=>{
    return {...state};
};



const actionHandlers = {
    [GET_COURSE_LIST_LOAD]: onGetCourseListLoad,
    [GET_COURSE_LIST_SUC]: onGetCourseListSuc,
    [GET_COURSE_LIST_ERR]: onGetCourseListErr,
    [MODIFY_COURSE_LOAD]: onModifyCourseLoad,
    [MODIFY_COURSE_SUC]: onModifyCourseSuc,
    [MODIFY_COURSE_ERR]: onModifyCourseErr,
    [DELETE_COURSE_LOAD]: onDelCourseLoad,
    [DELETE_COURSE_SUC]: onDelCourseSuc,
    [DELETE_COURSE_ERR]: onDelCourseErr,
    [GET_COURSE_DETAIL_LOAD]: onGetCourseDetailLoad,
    [GET_COURSE_DETAIL_SUC]: onGetCourseDetailSuc,
    [GET_COURSE_DETAIL_ERR]: onGetCourseDetailErr,
     [MODIFY_COURSE_DETAIL_LOAD]: onModifyCourseDetailLoad,
    [MODIFY_COURSE_DETAIL_SUC]: onModifyCourseDetailSuc,
    [MODIFY_COURSE_DETAIL_ERR]: onModifyCourseDetailErr,

};

export default createReducer(initialState, actionHandlers);

export function getCourseList(action) {
    return {
        types: [GET_COURSE_LIST_LOAD,GET_COURSE_LIST_SUC,GET_COURSE_LIST_ERR],
        promise: request.post(URL_GET_COURSE_LIST).send(action),
        action
    }
}
export function modifyCourse(action) {
    return {
        types: [MODIFY_COURSE_LOAD,MODIFY_COURSE_SUC,MODIFY_COURSE_ERR],
        promise: request.post(URL_MODIFY_COURSE).send(action),
        action
    }
}
export function deleteCourse(action) {
    return {
        types: [DELETE_COURSE_LOAD,DELETE_COURSE_SUC,DELETE_COURSE_ERR],
        promise: request.post(URL_DELETE_COURSE).send(action),
        action
    }
}
export function getCourseDetail(action) {
    return {
        types: [GET_COURSE_DETAIL_LOAD,GET_COURSE_DETAIL_SUC,GET_COURSE_DETAIL_ERR],
        promise: request.post(URL_GET_COURSE_DETAIL).send(action),
        action
    }
}
export function modifyCourseDetail(action) {
    return {
        types: [MODIFY_COURSE_DETAIL_LOAD,MODIFY_COURSE_DETAIL_SUC,MODIFY_COURSE_DETAIL_ERR],
        promise: request.post(URU_MODIFY_COURSE_DETAIL).send(action),
        action
    }
}