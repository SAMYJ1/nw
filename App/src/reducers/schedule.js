import request from '../utils/fetchRequest';
import createReducer from '../utils/createReducer';
import { URL_GET_SCHEDULE_DATA } from '../utils/constants';

const GET_SCHEDULE_LIST_LOAD = 'SCHEDULE.GET_SCHEDULE_LIST_LOAD';
const GET_SCHEDULE_LIST_SUC = 'SCHEDULE.GET_SCHEDULE_LIST_SUC';
const GET_SCHEDULE_LIST_ERR = 'SCHEDULE.GET_SCHEDULE_LIST_ERR';

const initialState = {
    loading: false,
    scheduleData: [],
    confirm: false,
};

let onGetScheduleLoad = (state=initialState, actionObj)=>{
    return {...state}
};
let onGetScheduleSuc = (state=initialState, actionObj)=>{
    let scheduleData = actionObj.result.data.schedule;
    let confirm = actionObj.result.data.confirm;

    return {...state, scheduleData, confirm}
};
let onGetScheduleErr = (state=initialState, actionObj)=>{
    return {...state}
};

const actionHandlers = {
    [GET_SCHEDULE_LIST_LOAD]: onGetScheduleLoad,
    [GET_SCHEDULE_LIST_SUC]: onGetScheduleSuc,
    [GET_SCHEDULE_LIST_ERR]: onGetScheduleErr,
};

export default createReducer(initialState, actionHandlers);

export function getSchedule(action) {
    return {
        types: [GET_SCHEDULE_LIST_LOAD,GET_SCHEDULE_LIST_SUC,GET_SCHEDULE_LIST_ERR],
        promise: request.get(URL_GET_SCHEDULE_DATA).send(action),
        action
    }
}