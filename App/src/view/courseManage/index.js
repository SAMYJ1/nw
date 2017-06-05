import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { StyleSheet, View, ListView, Text, RefreshControl } from 'react-native'
import {Toast, List, SwipeAction, } from 'antd-mobile';
import { getCourseList,  deleteCourse } from '../../reducers/courseManage'
import {getTeacherList} from '../../reducers/teacher'
import Icon from 'react-native-vector-icons/FontAwesome'


const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1 !==r2});

class CourseManage extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseList: ds.cloneWithRows([]),
            teacherList: [],
            refreshing: false,
        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '课程管理',
        headerRight: (
            <Text onPress={()=>{console.log(navigation);navigation.state.params.addNewCourse()}}>新增   </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="columns" size={20} color={tintColor} />
        )
    });


    componentWillMount(){
        this.props.getCourseList({courseName:''});
        this.props.getTeacherList({account: ''})
    }
    componentDidMount(){
        this.props.navigation.setParams({addNewCourse: this.onAddNewCourse.bind(this)});
        Toast.loading('加载中...', 0, null, false)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.courseList){
            this.setState({refreshing: false})
        }
        if (this.props.courseList !== nextProps.courseList){
            Toast.hide();
            this.setState({courseList: ds.cloneWithRows(nextProps.courseList)})
        }
        if (this.props.teacherList !== nextProps.teacherList){
            let teacherList = nextProps.teacherList.map(item =>{
                return item.account
            })
            this.setState({teacherList})
        }
        if (!this.props.deleteSuccess && nextProps.deleteSuccess){
            this.setState({courseList: ds.cloneWithRows(nextProps.courseList)})
        }
    }


    onAddNewCourse(){
        const {teacherList} = this.state;
        this.props.navigation.navigate('CourseManageDetail', {method: 'add', teacherList})
    }


    showCourseDetail(data){
        const {teacherList} = this.state;
        this.props.navigation.navigate('CourseManageDetail', {course: data, method: 'modify', teacherList})
    }

    onDeleteCourse(courseName){
        this.props.deleteCourse({courseName})
    }

    renderRow(rowData){

        return (
            <SwipeAction
                style={{ backgroundColor: 'gray' }}
                autoClose
                right={[
                    {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                    },
                    {
                        text: 'Delete',
                        onPress: () => this.onDeleteCourse(rowData.courseName),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                    },
                ]}

            >
                <List.Item
                    arrow="horizontal"
                    multipleLine
                    onClick={this.showCourseDetail.bind(this, rowData)}
                    platform="android"
                >
                    <View style={styles.courseItemBox}>
                        <View style={styles.courseProp}>
                            <Text>{rowData.courseName}</Text>
                        </View>
                        <View style={styles.courseProp}>
                            <Text>{rowData.courseCode}</Text>
                        </View>
                        <View style={styles.courseProp}>
                            <Text>{rowData.teacher ? rowData.teacher.length<3 ? rowData.teacher.slice(0, 2).join('、'): rowData.teacher.slice(0, 2).join('、') + '...' : ''}</Text>
                        </View>
                    </View>
                </List.Item>
            </SwipeAction>

        )
    }
    renderHeader(){
        return (
            <View style={styles.courseListTitle}>
                <View style={styles.headerProp}>
                    <Text>课程名</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>编号</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>任课教师</Text>
                </View>
            </View>
        )
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getCourseList({courseName: ''})
    }

    render(){
        const {courseList} = this.state;


        return (
            <View style={styles.body}>
                <View style={styles.courseList}>

                    <ListView
                        renderHeader={this.renderHeader.bind(this)}
                        renderRow={this.renderRow.bind(this)}
                        dataSource={courseList}
                        enableEmptySections
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    />
                </View>
            </View>
        )
    }
}

export default connect(state => {
    return {
        ...state.courseManage,
        teacherList: state.teacher.teacherList
    }
}, dispatch => bindActionCreators({ getCourseList,  deleteCourse, getTeacherList },dispatch))(CourseManage);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'snow',
    },
    courseList: {
        flex: 1,
        marginTop: 20,

    },
    courseListTitle: {

        height: 40,
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        borderRadius: 4,
        marginLeft: 2,
        marginBottom: 5,
        marginRight: 22,
    },
    titleProp:{
        flex: 1,

    },
    courseItemBox: {

        height: 50,
        flexDirection: 'row',
    },
    courseProp: {

        flex: 1,
        paddingLeft: 5,
        paddingTop: 10,
        marginHorizontal: 1,
        backgroundColor: '#fefefe',
        borderStyle: 'dashed',
        borderLeftWidth: .3,
        borderRadius: 3,
    },
    headerProp: {
        flex: 1,
        paddingLeft: 7,
        paddingTop:10,
        marginHorizontal: 1,
        backgroundColor: '#bec7ff',
        borderStyle: 'dashed',
        borderLeftWidth: .3,
        borderRadius: 3,
    }
});