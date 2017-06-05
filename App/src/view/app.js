
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './Home';
import Schedule from './schedule';
import CourseDetail from './schedule/courseDetail';
import StudentList from './schedule/students';
import Comment from './comment';
import Course from './course';
import Login from './Login';
import Notice from './notice';
import AddNotice from './notice/addNotice';
import showNoticeDetail from './notice/showNotice';
import Student from './student';
import StudentDetail from './student/studentDetail'
import Teacher from './teacher';
import TeacherDetail from './teacher/teacherDetail'
import CourseManage from './courseManage';
import CourseManageDetail from './courseManage/courseManageDetail'




const TabContainer = TabNavigator(
    {

        Main: { screen: Home },
        Schedule: { screen: Schedule },
        Course: {screen: Course},
        Comment: {screen: Comment},
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);
const AdminContainer = TabNavigator(
    {

        Main: { screen: Home},
        Notice: {screen: Notice},
        Student: { screen: Student },
        Teacher: {screen: Teacher},
        CourseManage: {screen: CourseManage},
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = StackNavigator(
    {
        Login: {
            screen: Login,
        },
        Home: {
            screen: TabContainer,
        },
        Admin: {
            screen: AdminContainer,
        },
        ShowCourseDetail: {
            screen: CourseDetail
        },
        Students: {
            screen: StudentList
        },
        NoticeDetail: {
            screen: showNoticeDetail
        },
        NewNotice: {
            screen: AddNotice
        },
        StudentDetail: {
            screen: StudentDetail
        },
        TeacherDetail: {
            screen: TeacherDetail
        },
        CourseManageDetail: {
            screen: CourseManageDetail
        }
    }
);

export default App
