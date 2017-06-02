import { combineReducers } from 'redux';

//export default reducers;
// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html

import home from './home';
import user from './user';
import schedule from './schedule';
import comment from './comment';
import course from './course';
import notice from './notice';
import student from './student';
import teacher from './teacher';
import courseManage from './courseManage';




const reducers = combineReducers({home, user, schedule, comment, course, notice, student, teacher, courseManage});

export default reducers;

