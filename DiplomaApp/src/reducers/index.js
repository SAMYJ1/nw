import { combineReducers } from 'redux';

//export default reducers;
// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html

import home from './home';



const reducers = combineReducers({home});

export default reducers;

