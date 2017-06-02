export const HOST = 'http://192.168.97.135:8080';

export const URL_LOGIN = HOST + '/api/User/login';
//课程表
export const URL_GET_SCHEDULE_DATA = HOST + '/api/Schedule/getPersonalSchedule';


//课程信息
export const URL_GET_COURSEINFO_LIST = HOST + '/api/Course/getCourseDetail';


//评论
export const URL_GET_COMMENT_LIST = HOST + '/api/Comment/findAll';
export const URL_ADD_COMMENT = HOST + '/api/Comment/saveComment';
export const URL_ADD_REPLY = HOST + '/api/Comment/saveReply';


//公告
export const URL_GET_NOTICE_LIST = HOST + '/api/Announce/findAll';
export const URL_MODIFY_NOTICE = HOST + '/api/Announce/save';
export const URL_DEL_NOTICE = HOST + '/api/Announce/delete';

//教师列表
export const URL_GET_TEACHER_LIST = HOST + '/api/User/findTeachers';
export const URL_ADD_TEACHER = HOST + '/api/User/saveTeacher';
export const URL_DEL_TEACHER = HOST + '/api/User/deleteTeacher';

//学生列表
export const URL_GET_STUDENT_LIST = HOST + '/api/User/findStudents';
export const URL_DEL_STUDENT = HOST + '/api/User/deleteStudent';
export const URL_MODIFY_STUDENT = HOST +  '/api/User/saveStudent';
export const URL_GET_ALL_COURSE_NAME = HOST + '/api/CourseColumn/findAllCourseName';

//课程
export const URL_GET_COURSE_LIST = HOST + '/api/CourseColumn/findAll';
export const URL_MODIFY_COURSE = HOST + '/api/CourseColumn/save';
export const URL_DELETE_COURSE = HOST + '/api/CourseColumn/deleteByCourseName';