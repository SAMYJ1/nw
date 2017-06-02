import createReducer from '../utils/createReducer';
import { URL_GET_TEACHER_LIST, URL_ADD_TEACHER, URL_DEL_TEACHER, } from '../utils/constants';
import request from '../utils/fetchRequest';

const GET_TEACHER_LIST_LOADING = 'TEACHER.GET_TEACHER_LIST_LOADING';
const GET_TEACHER_LIST_SUC = 'TEACHER.GET_TEACHER_LIST_SUC';
const GET_TEACHER_LIST_ERR = 'TEACHER.GET_TEACHER_LIST_ERR';


const MODIFY_TEACHER_LOAD = 'TEACHER.MODIFY_TEACHER_LOAD';
const MODIFY_TEACHER_SUC = 'TEACHER.MODIFY_TEACHER_SUC';
const MODIFY_TEACHER_ERR = 'TEACHER.MODIFY_TEACHER_ERR';

const DEL_TEACHER_LOAD = 'TEACHER.DEL_TEACHER_LOAD';
const DEL_TEACHER_SUC = 'TEACHER.DEL_TEACHER_SUC';
const DEL_TEACHER_ERR = 'TEACHER.DEL_TEACHER_ERR';



const initialState = {
    teacherList: [],
    loading: false,
    reload: false,
    deleteSuccess: false,
    modifySuccess: false,
};
/*获取教师列表*/
let onTeacherLoad = (state= initialState, actionObj)=>{
    return {...state,loading: true}
};
let getTeacherSuc = (state = initialState, actionObj)=>{
    let teacherList = actionObj.result.data || [];
    return {...state, loading: false, teacherList}
};
let getTeacherErr = (state = initialState, actionObj)=>{

    return { ...state, loading: false}
};

/*修改教师信息*/
let onModifyTeacherLoad = (state=initialState, actionObj)=>{
    return {...state, reload:false, modifySuccess: false}
};
let onModifyTeacherSuc = (state=initialState, actionObj)=>{
    return {...state, reload: true, modifySuccess: true}
};
let onModifyTeacherErr = (state=initialState, actionObj)=>{
    return {...state, reload: false, modifySuccess: false}
};
/*删除教师*/
let onDelTeacherLoad = (state=initialState, actionObj)=>{
    return {...state, deleteSuccess: false}
};
let onDelTeacherSuc = (state=initialState, actionObj)=>{
    let id = actionObj.action.id;
    let { teacherList } = state;
    let delId = teacherList.findIndex(item=>item.id === id);
    delId !== -1  && teacherList.splice(delId, 1);

    return {...state, teacherList, deleteSuccess: true}
};
let onDelTeacherErr = (state=initialState, actionObj)=>{
    return state
};


const actionHandlers = {
    [GET_TEACHER_LIST_LOADING]: onTeacherLoad,
    [GET_TEACHER_LIST_SUC]: getTeacherSuc,
    [GET_TEACHER_LIST_ERR]: getTeacherErr,
    [MODIFY_TEACHER_LOAD]: onModifyTeacherLoad,
    [MODIFY_TEACHER_SUC]: onModifyTeacherSuc,
    [MODIFY_TEACHER_ERR]: onModifyTeacherErr,
    [DEL_TEACHER_LOAD]: onDelTeacherLoad,
    [DEL_TEACHER_SUC]: onDelTeacherSuc,
    [DEL_TEACHER_ERR]: onDelTeacherErr,

};

export default createReducer(initialState, actionHandlers);

export function getTeacherList(action) {
    return {
        types: [GET_TEACHER_LIST_LOADING, GET_TEACHER_LIST_SUC, GET_TEACHER_LIST_ERR],
        promise: request.get(URL_GET_TEACHER_LIST).send(action),
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



