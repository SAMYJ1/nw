import createReducer from '../utils/createReducer';
import request from '../utils/fetchRequest';

import { URL_GET_MENU } from '../utils/constants';


export const LOADING = 'CONFIG_LOADING';
export const BACKEND_ERR = 'CONFIG_BACKEND_ERR';
export const ON_MENU_SUC = 'CONFIG_ON_MENU_SUC';
export const ON_ADD_TAB = 'CONFIG.ON_ADD_TAB';
export const ON_SELECT_TAB = 'CONFIG.ON_SELECT_TAB';
export const ON_REMOVE_TAB = 'CONFIG.ON_REMOVE_TAB';
export const ON_RESET_INITIAL_STATE = 'CONFIG.ON_RESET_INITIAL_STATE';
export const ON_REMOVE_ALL_TABS = 'CONFIG.ON_REMOVE_ALL_TABS';

export const homeTab = {
    key: 'home',
    title: '首页',
    url: '/Home',
};

const initialState = {
    loading: false,
    menuData: [],
    tabs: [ homeTab ],
    activeTabKey: homeTab.key,
};


let onLoading = (state=initialState, action)=>{
    return {...state,loading:true};
};
let onBackendErr = (state=initialState, action)=>{
    return {...state, errorMessage: action.error.message, loading: false}
};

let onGetMenu = (state=initialState, action)=>{
    let menuData = action.result.data;
    return {...state, menuData, loading: false}
};

let onAddTab = (state=initialState, actionObj)=>{
    let action = actionObj.action;
    let {tabs, activeTabKey } = state;
    let newTabs = [...tabs];
    let { key } = action;
    let matchedTab = newTabs.find( item => item.key === key);
    if (matchedTab){
        return {...state, activeTabKey: matchedTab.key};
    }else {
        newTabs.push(action);
        return {...state, tabs: [...newTabs],activeTabKey: key };
    }
};

let onSelectTab = (state=initialState, actionObj)=>{
    return {...state, activeTabKey: actionObj.action.key };
};
let onRemoveTab = (state=initialState, actionObj)=>{
    let action = actionObj.action;
    let { tabs, activeTabKey } = state;
    console.log('the tabs&activeTabKey are:; ',tabs,activeTabKey)
    let {key} = action;
    tabs = tabs.filter(item => item.key !==key );
    if (activeTabKey === key){
        activeTabKey = tabs.length > 0 ?tabs[tabs.length-1].key : '';
    }
    console.info(tabs,activeTabKey)
    return {...state, tabs, activeTabKey}
};
let onResetInitialState = (state=initialState, action)=>{
    return {...state}
};

let onRemoveAllTabs = (state=initialState, action)=>{
    console.log(state.tabs,initialState.tabs)
    let tabs = [...initialState.tabs];
    return {...state, tabs, activeTabKey: 'home'}
};


const actionHandlers = {
    [LOADING]:onLoading,
    [BACKEND_ERR]:onBackendErr,
    [ON_MENU_SUC]:onGetMenu,
    [ON_ADD_TAB]:onAddTab,
    [ON_SELECT_TAB]:onSelectTab,
    [ON_REMOVE_TAB]:onRemoveTab,
    [ON_RESET_INITIAL_STATE]:onResetInitialState,
    [ON_REMOVE_ALL_TABS]:onRemoveAllTabs,

};

export default createReducer(initialState,actionHandlers);

export function getMenu(action) {
    return {
        types: [LOADING, ON_MENU_SUC, BACKEND_ERR],
        promise: request.post(URL_GET_MENU).send({...action}),
        action
    }
}

export function addTab(action) {
    return {
        type: ON_ADD_TAB,
        action
    }
}

export function selectedTab(action){
    return {
        type:ON_SELECT_TAB,
        action
    }
}

export function removeTab(action){
    return {
        type:ON_REMOVE_TAB,
        action
    }
}

export function resetInitialState(action) {
    return {
        type: ON_RESET_INITIAL_STATE,
        action
    }
}

export function removeAllTabs(action) {
    return {
        type: ON_REMOVE_ALL_TABS,
        action
    }
}
