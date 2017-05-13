'use strict'

export default function createReducer (initialState, actionHandlers) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) return state
    
	//for reducers in tabs
	let tabKey = action.action && action.action.tabKey;
	if(tabKey){						
		let innerState = state[tabKey];
		innerState = reduceFn(innerState, action) ;
		return { ...state, [tabKey]:innerState };
	}
// Looks it works like Object.assign
    return { ...state, ...reduceFn(state, action) };
  }
}
