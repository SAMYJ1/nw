import { combineReducers } from 'redux';

//export default reducers;
// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html

const context = require.context('./', false, /\.js$/);	
const keys = context.keys().filter(item => item !== './index.js');
console.log('keys = ',keys);
const reducersKeys = keys.reduce((memo, key) => {
  memo[key.match(/([^\/]+)\.js$/)[1]] = context(key).default;
  return memo;
}, {});

const reducers = combineReducers(reducersKeys);

export default reducers;

