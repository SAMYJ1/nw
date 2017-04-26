import { URL_GET_PER_SCHEDULE } from '../utils/constants'
import request from '../utils/fetchRequest';
import createReducer from '../utils/createReducer';

const GET_SCHEDULE_LOAD = 'SCHEDULE.GET_SCHEDULE_LOAD';
const GET_SCHEDULE_SUC = 'SCHEDULE.GET_SCHEDULE_SUC';
const GET_SCHEDULE_ERR = 'SCHEDULE.GET_SCHEDULE_ERR';

const initialState = {

};


const actionHandlers = {
    [GET_SCHEDULE_LOAD]: onGetSheduleLoad,
    [GET_SCHEDULE_SUC]: onGetSheduleSuc,
    [GET_SCHEDULE_ERR]: onGetSheduleErr,
};

export default createReducer(initialState, actionHandlers);

export function getPersonalSchedule(action) {
    return {
        types: [GET_SCHEDULE_LOAD,GET_SCHEDULE_SUC,GET_SCHEDULE_ERR],
        promise: request.post(URL_GET_PER_SCHEDULE).send(action),
        action
    }
}