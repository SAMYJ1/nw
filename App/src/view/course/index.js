import React, {Component} from 'react';
import {StyleSheet, View, Text, ListView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons'
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
import { getCourseInfoList } from '../../reducers/course'

/*const courseData = [
    {
        "courseName": '钢琴',
        "list": [
            {
                "id": 1,
                "courseType": '两年课程规划',
                "customizedCourses":{
                    "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                },

            },
            {
                "id": 2,
                "courseType": '一年课程规划',
                "customizedCourses":{
                    "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                },
            },
        ],
        "title": { "col1": "收获成果", "col2": "1对1"}
    },
    {
        "courseName": '吉他',
        "list": [
            {
                "id": 1,
                "courseType": '两年课程规划',
                "customizedCourses":{
                    "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                },

            },
            {
                "id": 2,
                "courseType": '三年课程规划',
                "customizedCourses":{
                    "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                },
            },
        ],
        "title": { "col1": "收获成果", "col2": "1对1"}
    },

];*/

class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            courseData: [],
            rowData: {},
        };
    }
    static navigationOptions = ({navigation})=>({
        title: '课程信息',
        tabBarIcon({tintColor}){
            return <Icon name="tag" color={tintColor} size={30}/>
        }
    });

    componentWillMount(){
        this.props.getCourseInfoList();
    }
    componentWillReceiveProps(nextProps){
        console.log('will receive props',nextProps.courseData)
        if (this.props.courseData !== nextProps.courseData){

            this.setState({courseData: this.formatData(nextProps.courseData)})
        }
    }

    formatData(courseData){
        for (let item of courseData){
            let list = item.list;
            item.list = list.map(listItem =>{
                delete listItem.id;
                return {courseType:listItem.courseType, ...listItem.customizedCourses};
            })
        }
        return courseData
    }


    renderContent(list, title){
        const { dataSource } = this.state;

        return (
            <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                <View style={styles.tableHeader}>
                    <View style={styles.tableTitle}><Text style={{textAlign: 'center'}}>课程类别</Text></View>
                    {Object.values(title).map((item,index) => {
                        return (
                            <View  key={index} style={styles.tableTitle}>
                                <Text style={{textAlign: 'center'}}>{item}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.tableContainer}>
                    <ListView
                        dataSource={dataSource.cloneWithRows(list)}
                        renderRow={this.renderCourseList.bind(this)}
                    />
                </View>
            </View>
        )
    }
    renderCourseList(rowData){
        console.log(rowData)
        return (
            <View style={styles.row}>
                <View style={styles.cell}><Text>{rowData.courseType}</Text></View>
                {
                    delete rowData.courseType&&
                    Object.values(rowData).map((item,index)=>
                        <View key={index} style={styles.cell}>
                            <Text>{item}</Text>
                        </View>
                    )
                }
            </View>
        )
    }

    render(){
        const {courseData, } = this.state;


        return (
            <View style={{flex: 1, backgroundColor: 'snow'}}>
                <View style={{flex: 1}}>
                    <ScrollableTabView
                        renderTabBar={() => (
                            <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />
                        )}
                        tabBarBackgroundColor="#fcfcfc"
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarActiveTextColor="#3e9ce9"
                        tabBarInactiveTextColor="#aaaaaa"
                    >
                        {
                            courseData.map((item,index) =>{
                                return (
                                    <View key={index} tabLabel={item.courseName} style={{flex: 1}}>
                                        {this.renderContent(item.list, item.title)}
                                    </View>
                                )
                            })
                        }
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}

export default connect(state => {
    return {
        ...state.course
    }
}, dispatch => bindActionCreators({ getCourseInfoList,  }, dispatch))(Course);

const styles = StyleSheet.create({
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    },
    tableHeader: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#a4dbff',
        paddingTop: 10,
        marginBottom: 2
    },
    tableTitle: {
        flex: 1,
    },
    tableContainer: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f1fffd',
    },
    cell:{
        padding: 10,
        marginLeft: 2,
        margin: .5,
        flex: 1,
        borderRadius: 2,
        backgroundColor: '#43ffaa'
    },
    cellText: {
        fontSize: 12,
        textAlign: 'center',
    }
});
