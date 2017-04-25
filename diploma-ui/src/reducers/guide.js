import {  } from '../utils/constants';
import request from '../utils/fetchRequest';
import createReducer from '../utils/createReducer';

const GET_GUIDE_LOAD = 'GUIDE.GET_GUIDE_LOAD';
const GET_GUIDE_SUC = 'GUIDE.GET_GUIDE_SUC';
const GET_GUIDE_ERR = 'GUIDE.GET_GUIDE_ERR';

const initialState = {
    loading: false,
};

let onGetGuideLoad = (state= initialState, actionObj)=>{
    return {...state, loading:true};
};
let onGetGuideSuc = (state= initialState, actionObj)=>{
    return {...state, loading:false};
};
let onGetGuideErr = (state= initialState, actionObj)=>{
    return {...state, loading:false};
};



const actionHandlers = {
    [GET_GUIDE_LOAD]: onGetGuideLoad,
    [GET_GUIDE_SUC]: onGetGuideSuc,
    [GET_GUIDE_ERR]: onGetGuideErr,

};

export default createReducer(initialState,actionHandlers);

export function getGuide() {

}
