

const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js' && !/config.js$/.test(item) );

const views = keys.reduce((memo, key) => {
    //memo[key.match(/([^\/]+)\.js$/)[1]] = context(key);
    let key2 = key.replace(/\/index.js$/, "").replace(/.js$/,"").replace(/^\./,"");
    memo[key2] = context(key);
    return memo;
}, {});

export default views;
