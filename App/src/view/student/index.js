import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { StyleSheet, View, ListView, Text, RefreshControl } from 'react-native'
import {Toast, List, SwipeAction, Modal } from 'antd-mobile';
import { getStudentList, delStudent, getAllCourse } from '../../reducers/student'
import Icon from 'react-native-vector-icons/FontAwesome'

const alert = Modal.alert;

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1 !==r2});

class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentList: ds.cloneWithRows([]),
            courseList: [],
            refreshing: false,
        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '学员管理',
        headerRight: (
            <Text onPress={()=>{console.log(navigation);navigation.state.params.addNewStudent()}}>新增   </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user-o" size={20} color={tintColor} />
        )
    });


    componentWillMount(){
        this.props.getStudentList({account:''});
        this.props.getAllCourse();

    }
    componentDidMount(){
        this.props.navigation.setParams({addNewStudent: this.onAddNewStudent.bind(this)});
        Toast.loading('加载中...', 0, null, false)
    }
    componentWillReceiveProps(nextProps){
        console.log('will receive props')
        if (nextProps.studentList){
            this.setState({refreshing: false})
        }
        if (this.props.studentList !== nextProps.studentList){
            Toast.hide();
            this.setState({studentList: ds.cloneWithRows(nextProps.studentList)})
        }
        if (this.props.courseList !== nextProps.courseList){
            this.setState({courseList: nextProps.courseList})
        }
        if (!this.props.deleteSuccess && nextProps.deleteSuccess){
            console.log(nextProps.studentList)
            this.setState({studentList: ds.cloneWithRows(nextProps.studentList)})
        }
    }


    onAddNewStudent(){
        const {courseList} = this.state;
        this.props.navigation.navigate('StudentDetail', {method: 'add', courseList})
    }


    showStudentDetail(data){
        const {courseList} = this.state;
        this.props.navigation.navigate('StudentDetail', {student: data, method: 'modify',courseList})
    }

    onDeleteStudent(account){
        alert('删除', '确定删除么???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.props.delStudent({account}), style: { fontWeight: 'bold' } },
        ])
    }

    renderRow(rowData){

        return (
            <SwipeAction
                style={{ backgroundColor: 'gray' }}
                autoClose
                right={[
                    {
                        text: '取消',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                    },
                    {
                        text: '删除',
                        onPress: () => this.onDeleteStudent(rowData.account),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                    },
                ]}

                onOpen={() => console.log('global open')}
                onClose={() => console.log('global close')}
            >
                <List.Item
                    arrow="horizontal"
                    multipleLine
                    onClick={this.showStudentDetail.bind(this, rowData)}
                    platform="android"
                >
                    <View style={styles.studentItemBox}>
                        <View style={styles.studentProp}>
                            <Text>{rowData.account}</Text>
                        </View>
                        <View style={styles.studentProp}>
                            <Text>{rowData.sex === 0 ? '女': '男'}</Text>
                        </View>
                        <View style={styles.studentProp}>
                            <Text>{rowData.course ? rowData.course.join('、'): ''}</Text>
                        </View>
                    </View>
                </List.Item>
            </SwipeAction>

        )
    }
    renderHeader(){
        return (
            <View style={styles.studentListTitle}>
                <View style={styles.headerProp}>
                    <Text>姓名</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>性别</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>报名课程</Text>
                </View>
            </View>
        )
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getStudentList({account: ''})
    }

    render(){
        const {studentList} = this.state;


        return (
            <View style={styles.body}>
                <View style={styles.studentList}>

                    <ListView
                        renderHeader={this.renderHeader.bind(this)}
                        renderRow={this.renderRow.bind(this)}
                        dataSource={studentList}
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
        ...state.student
    }
}, dispatch => bindActionCreators({ getStudentList, delStudent, getAllCourse },dispatch))(Student);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'snow',
    },
    studentList: {
        flex: 1,
        marginTop: 20,

    },
    studentListTitle: {

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
    studentItemBox: {

        height: 50,
        flexDirection: 'row',
    },
    studentProp: {

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