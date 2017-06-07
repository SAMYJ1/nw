import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { StyleSheet, View, ListView, Text, TouchableOpacity,RefreshControl } from 'react-native'
import {Toast, List, SwipeAction, Modal} from 'antd-mobile';
import { getTeacherList, modifyTeacher, delTeacher  } from '../../reducers/teacher'
import Icon from 'react-native-vector-icons/FontAwesome'

const alert = Modal.alert;

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1 !==r2});

class Teacher extends Component{
    constructor(props){
        super(props);
        this.state = {
            teacherList: ds.cloneWithRows([]),
            courseList: [],
            refreshing: false,
        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '教师管理',
        headerRight: (
            <Text onPress={()=>{navigation.state.params.addNewTeacher()}}>新增   </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user-o" size={20} color={tintColor} />
        )
    });


    componentWillMount(){
        this.props.getTeacherList({account:''});

    }
    componentDidMount(){
        this.props.navigation.setParams({addNewTeacher: this.onAddNewTeacher.bind(this)})
        Toast.loading('加载中...', 0, null, false)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.teacherList){
            this.setState({refreshing: false})
        }
        if (this.props.teacherList !== nextProps.teacherList){
            Toast.hide();
            this.setState({teacherList: ds.cloneWithRows(nextProps.teacherList)})
        }
        if (this.props.courseList !== nextProps.courseList){
            this.setState({courseList: nextProps.courseList})
        }
    }


    onAddNewTeacher(){
        this.props.navigation.navigate('TeacherDetail', {method: 'add'})
    }


    showTeacherDetail(data){
        this.props.navigation.navigate('TeacherDetail', {teacher: data, method: 'modify'})
    }

    onDeleteTeacher(account){
        alert('删除', '确定删除么???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.props.delTeacher(account), style: { fontWeight: 'bold' } },
        ])

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
                        onPress: () => this.onDeleteTeacher(rowData.account),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                    },
                ]}
                
            >
                <List.Item
                    arrow="horizontal"
                    multipleLine
                    onClick={this.showTeacherDetail.bind(this, rowData)}
                    platform="android"
                >
                    <View style={styles.teacherItemBox}>
                        <View style={styles.teacherProp}>
                            <Text>{rowData.account}</Text>
                        </View>
                        <View style={styles.teacherProp}>
                            <Text>{rowData.sex === 0 ? '女': '男'}</Text>
                        </View>
                        <View style={styles.teacherProp}>
                            <Text>{rowData.teacherType === 0 ? '主教师' : '陪练教师'}</Text>
                        </View>
                    </View>
                </List.Item>
            </SwipeAction>

        )
    }
    renderHeader(){
        return (
            <View style={styles.teacherListTitle}>
                <View style={styles.headerProp}>
                    <Text>姓名</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>性别</Text>
                </View>
                <View style={styles.headerProp}>
                    <Text>类型</Text>
                </View>
            </View>
        )
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getTeacherList({account: ''})
    }

    render(){
        const {teacherList} = this.state;


        return (
            <View style={styles.body}>
                <View style={styles.teacherList}>

                    <ListView
                        renderHeader={this.renderHeader.bind(this)}
                        renderRow={this.renderRow.bind(this)}
                        dataSource={teacherList}
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
        ...state.teacher
    }
}, dispatch => bindActionCreators({ getTeacherList, modifyTeacher, delTeacher },dispatch))(Teacher);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'snow',
    },
    teacherList: {
        flex: 1,
        marginTop: 20,

    },
    teacherListTitle: {

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
    teacherItemBox: {

        height: 50,
        flexDirection: 'row',
    },
    teacherProp: {

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