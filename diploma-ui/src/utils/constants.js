export const HOST = '';

export const URL_LOGIN = HOST + '/api/User/login';
export const URL_RESET_PASSWORD = HOST + '';

export const URL_GET_MENU = HOST + '/api/System/getMenuList';


//教师列表
export const URL_GET_TEACHER_LIST = HOST + '/api/User/findTeachers';
export const URL_GET_TEACHER_DETAIL = HOST + '/api/Schedule/getPersonalSchedule';
export const URL_MODIFY_TEACHER_DETAIL= HOST + '/api/Course/saves';
export const URL_ADD_TEACHER = HOST + '/api/User/saveTeacher';
export const URL_DEL_TEACHER = HOST + '/api/User/deleteTeacher';
export const URL_GET_STU_AND_COUR_LIST =  HOST + '/api/Course/getStuAndCourse';

//学生列表
export const URL_GET_STUDENT_LIST = HOST + '/api/User/findStudents';
export const URL_DEL_STUDENT = HOST + '/api/User/deleteStudent';
export const URL_MODIFY_STUDENT = HOST +  '/api/User/saveStudent';
export const URL_GET_ALL_COURSE_NAME = HOST + '/api/CourseColumn/findAllCourseName';

//公告列表
export const URL_GET_NOTICE_LIST = HOST + '/api/Announce/findAll';
export const URL_MODIFY_NOTICE = HOST + '/api/Announce/save';
export const URL_DEL_NOTICE = HOST + '/api/Announce/delete';

//课程信息列表
export const URL_GET_COURSE_LIST = HOST + '/api/CourseColumn/findAll';
export const URL_MODIFY_COURSE = HOST + '/api/CourseColumn/save';
export const URL_DELETE_COURSE = HOST + '/api/CourseColumn/deleteByCourseName';
export const URL_GET_COURSE_DETAIL = HOST + '/api/Charge/findById';
export const URU_MODIFY_COURSE_DETAIL = HOST + '/api/Charge/save';

//个人课程表
export const URL_GET_PER_SCHEDULE = HOST + '/api/Schedule/getPersonalSchedule';
export const URL_CONFIRM_SCHEDULE = HOST + '/api/Message/confirm';

//交流
export const URL_GET_COMMENT_LIST = HOST + '/api/Comment/findAll';
export const URL_ADD_COMMENT = HOST + '/api/Comment/saveComment';
export const URL_ADD_REPLY = HOST + '/api/Comment/saveReply';


//课程信息展示列表
export const URL_GET_COURSE_INFO_LIST = HOST + '/api/Course/getCourseDetail';

//管理员信息提示
export const URL_GET_ADMIN_MESSAGE = HOST + '/api/Message/prompt';
export const URL_DELETE_MESSAGE = HOST + '/api/Message/delete';