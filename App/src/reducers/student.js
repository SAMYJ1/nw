import { URL_GET_STUDENT_LIST, URL_MODIFY_STUDENT, URL_DEL_STUDENT, URL_GET_ALL_COURSE_NAME } from '../utils/constants';
import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';

const GET_STUDENT_LIST_LOAD = 'STUDENT.GET_STUDENT_LIST_LOAD';
const GET_STUDENT_LIST_SUC = 'STUDENT.GET_STUDENT_LIST_SUC';
const GET_STUDENT_LIST_ERR = 'STUDENT.GET_STUDENT_LIST_ERR';

const MODIFY_STUDENT_LOAD = 'STUDENT.MODIFY_STUDENT_LOAD';
const MODIFY_STUDENT_SUC = 'STUDENT.MODIFY_STUDENT_SUC';
const MODIFY_STUDENT_ERR = 'STUDENT.MODIFY_STUDENT_ERR';

const DELETE_STUDENT_LOAD = 'STUDENT.DELETE_STUDENT_LOAD';
const DELETE_STUDENT_SUC = 'STUDENT.DELETE_STUDENT_SUC';
const DELETE_STUDENT_ERR = 'STUDENT.DELETE_STUDENT_ERR';

const GET_ALL_COURSE_LOAD = 'STUDENT.GET_ALL_COURSE_LOAD';
const GET_ALL_COURSE_SUC = 'STUDENT.GET_ALL_COURSE_SUC';
const GET_ALL_COURSE_ERR = 'STUDENT.GET_ALL_COURSE_ERR';


const initialState = {
    loading: false,
    studentList: [],
    courseList: [],
    reload: false,
    modifySuccess: false,
    deleteSuccess: false
};


let onGetStudentListLoad = (state=initialState,actionObj)=>{
    return {...state,loading: true}
};
let onGetStudentListSuc = (state=initialState, actionObj)=>{
    let studentList = actionObj.result.data;
    return {...state,loading: false, studentList}
};
let onGetStudentListErr = (state=initialState, actionObj)=>{
    return {...state,loading: false, }
};

let onModifyStudentLoad = (state=initialState, actionObj)=>{
    return {...state, reload: false, modifySuccess: false}
};
let onModifyStudentSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true, modifySuccess: true}
};
let onModifyStudentErr = (state=initialState, actionObj)=>{
    console.log(actionObj.result)
    return {...state, reload: false, modifySuccess: false}
};
let onDelStudentLoad = (state=initialState, actionObj)=>{
    return {...state, deleteSuccess: false }
};
let onDelStudentSuc = (state=initialState, actionObj)=>{
    let studentList = state.studentList;
    let rmIdx = studentList.findIndex(item=> item.account === actionObj.action.account);
    rmIdx !== -1 && studentList.splice(rmIdx,1);
    return {...state, studentList, deleteSuccess: true }
};
let onDelStudentErr = (state=initialState, actionObj)=>{
    return {...state, }
};

let onGetAllCourseLoad = (state=initialState, actionObj)=>{
    return {...state, }
};
let onGetAllCourseSuc = (state=initialState, actionObj)=>{
    let courseList = actionObj.result.data;
    return {...state, courseList }
};
let onGetAllCourseErr = (state=initialState, actionObj)=>{
    return {...state, }
};


const actionHandlers = {
    [GET_STUDENT_LIST_LOAD]: onGetStudentListLoad,
    [GET_STUDENT_LIST_SUC]: onGetStudentListSuc,
    [GET_STUDENT_LIST_ERR]: onGetStudentListErr,
    [MODIFY_STUDENT_LOAD]: onModifyStudentLoad,
    [MODIFY_STUDENT_SUC]: onModifyStudentSuc,
    [MODIFY_STUDENT_ERR]: onModifyStudentErr,
    [DELETE_STUDENT_LOAD]: onDelStudentLoad,
    [DELETE_STUDENT_SUC]: onDelStudentSuc,
    [DELETE_STUDENT_ERR]: onDelStudentErr,

    [GET_ALL_COURSE_LOAD]: onGetAllCourseLoad,
    [GET_ALL_COURSE_SUC]: onGetAllCourseSuc,
    [GET_ALL_COURSE_ERR]: onGetAllCourseErr,
};

export default createReducer(initialState, actionHandlers);

export function getStudentList(action) {
    return {
        types: [GET_STUDENT_LIST_LOAD,GET_STUDENT_LIST_SUC,GET_STUDENT_LIST_ERR],
        promise: request.get(URL_GET_STUDENT_LIST).send(action),
        action
    }
}

export function modifyStudent(action) {
    return {
        types: [MODIFY_STUDENT_LOAD,MODIFY_STUDENT_SUC,MODIFY_STUDENT_ERR],
        promise: request.post(URL_MODIFY_STUDENT).send(action),
        action
    }
}

export function delStudent(action) {
    return {
        types: [DELETE_STUDENT_LOAD,DELETE_STUDENT_SUC,DELETE_STUDENT_ERR],
        promise: request.get(URL_DEL_STUDENT).send(action),
        action
    }
}
export function getAllCourse(action) {
    return {
        types: [GET_ALL_COURSE_LOAD, GET_ALL_COURSE_SUC, GET_ALL_COURSE_ERR],
        promise: request.get(URL_GET_ALL_COURSE_NAME).send(action),
        action
    }
}