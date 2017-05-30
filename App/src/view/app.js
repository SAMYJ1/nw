
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './Home';
import Schedule from './schedule';
import CourseDetail from './schedule/courseDetail';
import StudentList from './schedule/students';
import Comment from './comment';
import Course from './course';
import Login from './Login';


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

    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
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
        ShowNoticeDetail: {

        }
    }
);

export default App
