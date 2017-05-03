import { URL_GET_PER_SCHEDULE, URL_CONFIRM_SCHEDULE } from '../utils/constants'
import request from '../utils/fetchRequest';
import createReducer from '../utils/createReducer';

const GET_SCHEDULE_LOAD = 'SCHEDULE.GET_SCHEDULE_LOAD';
const GET_SCHEDULE_SUC = 'SCHEDULE.GET_SCHEDULE_SUC';
const GET_SCHEDULE_ERR = 'SCHEDULE.GET_SCHEDULE_ERR';

const CONFIRM_SCHEDULE_LOAD = 'SCHEDULE.CONFIRM_SCHEDULE_LOAD';
const CONFIRM_SCHEDULE_SUC = 'SCHEDULE.CONFIRM_SCHEDULE_SUC';
const CONFIRM_SCHEDULE_ERR = 'SCHEDULE.CONFIRM_SCHEDULE_ERR';

const initialState = {
    loading: false,
    scheduleData: [],
    confirm: false,
};

let onGetScheduleLoad = (state=initialState, actionObj)=>{
    return {...state, loading: true}
};
let onGetScheduleSuc = (state=initialState, actionObj)=>{
    let scheduleData = actionObj.result.data.schedule;
    let confirm = actionObj.result.data.confirm;

    return {...state, loading: false, scheduleData, confirm}
};
let onGetScheduleErr = (state=initialState, actionObj)=>{
    return {...state, loading: false}
};

let onConfirmLoad = (state=initialState, actionObj)=>{
    return {...state, }
};
let onConfirmSuc = (state=initialState, actionObj)=>{
    return {...state, }
};
let onConfirmErr = (state=initialState, actionObj)=>{
    return {...state, }
};


const actionHandlers = {
    [GET_SCHEDULE_LOAD]: onGetScheduleLoad,
    [GET_SCHEDULE_SUC]: onGetScheduleSuc,
    [GET_SCHEDULE_ERR]: onGetScheduleErr,
    [CONFIRM_SCHEDULE_LOAD]: onConfirmLoad,
    [CONFIRM_SCHEDULE_SUC]: onConfirmSuc,
    [CONFIRM_SCHEDULE_ERR]: onConfirmErr,
};

export default createReducer(initialState, actionHandlers);

export function getPersonalSchedule(action) {
    return {
        types: [GET_SCHEDULE_LOAD,GET_SCHEDULE_SUC,GET_SCHEDULE_ERR],
        promise: request.post(URL_GET_PER_SCHEDULE).send(action),
        action
    }
}

export function confirmSchedule(action) {
    return {
        types: [CONFIRM_SCHEDULE_LOAD,CONFIRM_SCHEDULE_SUC,CONFIRM_SCHEDULE_ERR],
        promise: request.post(URL_CONFIRM_SCHEDULE).send(action),
        action
    }
}