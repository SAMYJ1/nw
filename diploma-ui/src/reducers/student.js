import { URL_GET_STUDENT_LIST, URL_MODIFY_STUDENT, URL_DEL_STUDENT } from '../utils/constants';
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


const initialState = {
    loading: false,
    studentList: [],
    reload: false,
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
    return {...state, reload: false}
};
let onModifyStudentSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true}
};
let onModifyStudentErr = (state=initialState, actionObj)=>{
    return {...state, reload: false}
};
let onDelStudentLoad = (state=initialState, actionObj)=>{
    return {...state, }
};
let onDelStudentSuc = (state=initialState, actionObj)=>{
    let studentList = state.studentList;
    let rmIdx = studentList.findIndex(item=> item.id === actionObj.action.id);
    studentList.splice(rmIdx,1);
    return {...state, studentList }
};
let onDelStudentErr = (state=initialState, actionObj)=>{
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

};

export default createReducer(initialState, actionHandlers);

export function getStudentList(action) {
    return {
        types: [GET_STUDENT_LIST_LOAD,GET_STUDENT_LIST_SUC,GET_STUDENT_LIST_ERR],
        promise: request.post(URL_GET_STUDENT_LIST).send(action),
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
        promise: request.post(URL_DEL_STUDENT).send(action),
        action
    }
}