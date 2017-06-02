import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';
import { URL_GET_COURSE_LIST, URL_MODIFY_COURSE, URL_DELETE_COURSE,   } from '../utils/constants';

const GET_COURSE_LIST_LOAD = 'COURSE_MANAGE.GET_COURSE_LIST_LOAD';
const GET_COURSE_LIST_SUC = 'COURSE_MANAGE.GET_COURSE_LIST_SUC';
const GET_COURSE_LIST_ERR = 'COURSE_MANAGE.GET_COURSE_LIST_ERR';

const MODIFY_COURSE_LOAD = 'COURSE_MANAGE.MODIFY_COURSE_LOAD';
const MODIFY_COURSE_SUC = 'COURSE_MANAGE.MODIFY_COURSE_SUC';
const MODIFY_COURSE_ERR = 'COURSE_MANAGE.MODIFY_COURSE_ERR';

const DELETE_COURSE_LOAD = 'COURSE_MANAGE.DELETE_COURSE_LOAD';
const DELETE_COURSE_SUC = 'COURSE_MANAGE.DELETE_COURSE_SUC';
const DELETE_COURSE_ERR = 'COURSE_MANAGE.DELETE_COURSE_ERR';


const initialState = {
    loading: false,
    courseList: [],
    reload: false,
    modifySuccess: false,
    deleteSuccess: false
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
    return {...state, reload: false, modifySuccess: false};
};
let onModifyCourseSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true, modifySuccess: true};
};
let onModifyCourseErr = (state=initialState, actionObj)=>{
    return {...state, reload: false, modifySuccess: false};
};
let onDelCourseLoad = (state=initialState, actionObj)=>{
    return {...state, deleteSuccess: false};
};
let onDelCourseSuc = (state=initialState, actionObj)=>{
    let courseList = state.courseList;
    let rmIdx = courseList.findIndex(item=>item.courseName === actionObj.action.courseName);
    rmIdx !== -1 && courseList.splice(rmIdx, 1);

    return {...state, courseList, deleteSuccess: true};
};
let onDelCourseErr = (state=initialState, actionObj)=>{
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


};

export default createReducer(initialState, actionHandlers);

export function getCourseList(action) {
    return {
        types: [GET_COURSE_LIST_LOAD,GET_COURSE_LIST_SUC,GET_COURSE_LIST_ERR],
        promise: request.get(URL_GET_COURSE_LIST).send(action),
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
        promise: request.get(URL_DELETE_COURSE).send(action),
        action
    }
}
