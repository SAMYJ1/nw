import createReducer from '../utils/createReducer';
import { URL_GET_TEACHER_LIST, URL_GET_TEACHER_DETAIL, URL_MODIFY_TEACHER_DETAIL, URL_ADD_TEACHER, URL_DEL_TEACHER, URL_GET_STU_AND_COUR_LIST } from '../utils/constants';
import request from '../utils/fetchRequest';

const GET_TEACHER_LIST_LOADING = 'TEACHER.GET_TEACHER_LIST_LOADING';
const GET_TEACHER_LIST_SUC = 'TEACHER.GET_TEACHER_LIST_SUC';
const GET_TEACHER_LIST_ERR = 'TEACHER.GET_TEACHER_LIST_ERR';

const GET_TEACHER_DETAIL_LOAD = 'TEACHER.GET_TEACHER_DETAIL_LOAD';
const GET_TEACHER_DETAIL_SUC = 'TEACHER.GET_TEACHER_DETAIL_SUC';
const GET_TEACHER_DETAIL_ERR = 'TEACHER.GET_TEACHER_DETAIL_ERR';

const MODIFY_TEACHER_DETAIL_LOAD = 'TEACHER.MODIFY_TEACHER_DETAIL_LOAD';
const MODIFY_TEACHER_DETAIL_SUC = 'TEACHER.MODIFY_TEACHER_DETAIL_SUC';
const MODIFY_TEACHER_DETAIL_ERR = 'TEACHER.MODIFY_TEACHER_DETAIL_ERR';

const MODIFY_TEACHER_LOAD = 'TEACHER.MODIFY_TEACHER_LOAD';
const MODIFY_TEACHER_SUC = 'TEACHER.MODIFY_TEACHER_SUC';
const MODIFY_TEACHER_ERR = 'TEACHER.MODIFY_TEACHER_ERR';

const DEL_TEACHER_LOAD = 'TEACHER.DEL_TEACHER_LOAD';
const DEL_TEACHER_SUC = 'TEACHER.DEL_TEACHER_SUC';
const DEL_TEACHER_ERR = 'TEACHER.DEL_TEACHER_ERR';

const GET_STU_AND_COUR_LIST_LOAD = 'TEACHER.GET_STU_AND_COUR_LIST_LOAD';
const GET_STU_AND_COUR_LIST_SUC = 'TEACHER.GET_STU_AND_COUR_LIST_SUC';
const GET_STU_AND_COUR_LIST_ERR = 'TEACHER.GET_STU_AND_COUR_LIST_ERR';




const initialState = {
    teacherList: [],
    teacherDetail: {},
    stuAndCourList: {},
    loading: false,
    detailLoading: false,
    reload: false,
    studentListReady: false
};
/*获取教师列表*/
let onTeacherLoad = (state= initialState, actionObj)=>{
    return {...state,loading: true}
};
let getTeacherSuc = (state = initialState, actionObj)=>{
    console.log('teacherList ：',actionObj);
    let teacherList = actionObj.result.data || [];
    return {...state, loading: false, teacherList}
};
let getTeacherErr = (state = initialState, actionObj)=>{

    return { ...state, loading: false}
};
/*获取教师课程信息*/
let onGetTeacherDetailLoad = (state = initialState, actionObj)=>{
    return {...state, detailLoading: true}
};
let onGetTeacherDetailSuc = (state = initialState, actionObj)=>{
    let teacherDetail = actionObj.result.data;
    return { ...state, teacherDetail, detailLoading: false}
};
let onGetTeacherDetailErr = (state = initialState, actionObj)=>{
    return {...state, detailLoading: false}
};
/*修改教师课程表*/
let onModifyTeacherDetailLoad = (state=initialState, actionObj)=>{
    return {...state,}
};
let onModifyTeacherDetailSuc = (state=initialState, actionObj)=>{
    return {...state}
};
let onModifyTeacherDetailErr = (state=initialState, actionObj)=>{
    return {...state}
};
/*修改教师信息*/
let onModifyTeacherLoad = (state=initialState, actionObj)=>{
    return {...state, reload:false}
};
let onModifyTeacherSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true}
};
let onModifyTeacherErr = (state=initialState, actionObj)=>{
    return {...state, reload: false}
};
/*删除教师*/
let onDelTeacherLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onDelTeacherSuc = (state=initialState, actionObj)=>{

    let { teacherList } = state;
    let delId = teacherList.findIndex(item=>item.account === actionObj.action.account);
    delId !== -1 && teacherList.splice(delId, 1);
    console.log(teacherList)

    return {...state, teacherList}
};
let onDelTeacherErr = (state=initialState, actionObj)=>{
    return {...state}
};
/*获取学生列表*/
let onGetStuAndCourListLoad = (state=initialState,actionObj)=>{
    return {...state, studentListReady: false}
};
let onGetStuAndCourListSuc = (state=initialState,actionObj)=>{
    let stuAndCourList = actionObj.result.data;
    return {...state, stuAndCourList, studentListReady: true}
};
let onGetStuAndCourListErr = (state=initialState,actionObj)=>{
    return {...state}
};


const actionHandlers = {
    [GET_TEACHER_LIST_LOADING]: onTeacherLoad,
    [GET_TEACHER_LIST_SUC]: getTeacherSuc,
    [GET_TEACHER_LIST_ERR]: getTeacherErr,
    [GET_TEACHER_DETAIL_LOAD]: onGetTeacherDetailLoad,
    [GET_TEACHER_DETAIL_SUC]: onGetTeacherDetailSuc,
    [GET_TEACHER_DETAIL_ERR]: onGetTeacherDetailErr,
    [MODIFY_TEACHER_DETAIL_LOAD]: onModifyTeacherDetailLoad,
    [MODIFY_TEACHER_DETAIL_SUC]: onModifyTeacherDetailSuc,
    [MODIFY_TEACHER_DETAIL_ERR]: onModifyTeacherDetailErr,
    [MODIFY_TEACHER_LOAD]: onModifyTeacherLoad,
    [MODIFY_TEACHER_SUC]: onModifyTeacherSuc,
    [MODIFY_TEACHER_ERR]: onModifyTeacherErr,
    [DEL_TEACHER_LOAD]: onDelTeacherLoad,
    [DEL_TEACHER_SUC]: onDelTeacherSuc,
    [DEL_TEACHER_ERR]: onDelTeacherErr,
    [GET_STU_AND_COUR_LIST_LOAD]: onGetStuAndCourListLoad,
    [GET_STU_AND_COUR_LIST_SUC]: onGetStuAndCourListSuc,
    [GET_STU_AND_COUR_LIST_ERR]: onGetStuAndCourListErr,

};

export default createReducer(initialState, actionHandlers);

export function getTeacherList(action) {
    return {
        types: [GET_TEACHER_LIST_LOADING, GET_TEACHER_LIST_SUC, GET_TEACHER_LIST_ERR],
        promise: request.get(URL_GET_TEACHER_LIST).send(action),
        action
    }
}

export function getTeacherDetail(action) {
    console.log(action)
    return {
        types:[GET_TEACHER_DETAIL_LOAD,GET_TEACHER_DETAIL_SUC,GET_TEACHER_DETAIL_ERR],
        promise: request.get(URL_GET_TEACHER_DETAIL).send(action),
        action
    }
}

export function modifySchedule(action) {
    return {
        types:[MODIFY_TEACHER_DETAIL_LOAD,MODIFY_TEACHER_DETAIL_SUC,MODIFY_TEACHER_DETAIL_ERR],
        promise: request.post(URL_MODIFY_TEACHER_DETAIL).send(action),
        action
    }
}

export function modifyTeacher(action) {
    return {
        types: [MODIFY_TEACHER_LOAD,MODIFY_TEACHER_SUC,MODIFY_TEACHER_ERR],
        promise: request.post(URL_ADD_TEACHER).send(action),
        action
    }
}

export function delTeacher(action) {
    return {
        types: [DEL_TEACHER_LOAD,DEL_TEACHER_SUC,DEL_TEACHER_ERR],
        promise: request.get(URL_DEL_TEACHER).send(action),
        action
    }
}

export function getStudentAndCourseList(action) {
    return {
        types:[GET_STU_AND_COUR_LIST_LOAD,GET_STU_AND_COUR_LIST_SUC,GET_STU_AND_COUR_LIST_ERR],
        promise: request.get(URL_GET_STU_AND_COUR_LIST).send(action),
        action
    }
}


