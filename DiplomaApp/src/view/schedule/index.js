import React, {Component} from 'react'
import { StyleSheet, View, Text, ListView, Navigator,TouchableWithoutFeedback } from 'react-native';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile'
import { getSchedule } from '../../reducers/schedule';

const scheduleData = [
        {
            "monday": { 'course':'c1','students':['s1','s3'], 'teacher': null, 'address':'z'},
            "tuesday": null,
            "wednesday": null,
            "thursday": null,
            "friday": null,
            "saturday": null,
            "sunday": { 'course':'c2','students':['s2'], 'teacher': null, 'address':'z'},
            "time": '9:30-10:30',
        },
        {
            "monday": null,
            "tuesday": { 'course':'c1','students':null, 'teacher': 'tom','address':'z'},
            "wednesday": null,
            "thursday": null,
            "friday": null,
            "saturday": null,
            "sunday": { 'course':'c1','students':null, 'teacher': 'lucy', 'address':'z'},
            "time": '9:00-10:00',
        }
    ];

class Schedule extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(scheduleData),
            showCourseModal: false,
            rowData: {},
        };

    }

    showCourseDetail(data, time){
        console.log(data)
        let rowData = {...data, time};
        this.setState({showCourseDetail: true, rowData})
    }
    closeCourseModal(){
        this.setState({showCourseModal: false})
    }


    renderRow(rowData){
        let keys = Object.keys(rowData);

        return (
            <View style={styles.row}>
                {
                    keys.map((item,index)=>{
                        if ( item !== 'time' &&rowData[item]){
                            return (
                                <TouchableWithoutFeedback key={index} onPress={this.showCourseDetail.bind(this,rowData[item], rowData.time)}>
                                    <View key={index} style={styles.col} >
                                        <Text key="1">{rowData[item].course}@{rowData[item].address}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }else if(item === 'time'){
                            return <View key={index} style={styles.col}><Text style={{textAlign: 'center'}}>{rowData[item]}</Text></View>
                        } else {
                            return <View key={index} style={styles.col}/>
                        }
                    })
                }

            </View>
        )
    }

    render(){
        const {dataSource, showCourseModal, rowData } = this.state;

        return(
            <View style={{flex: 1, paddingTop: 22,}}>
                <View style={{ height: 40,  flexDirection: 'row',}}>
                    <View key="1" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周一</Text></View>
                    <View key="2" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周二</Text></View>
                    <View key="3" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周三</Text></View>
                    <View key="4" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周四</Text></View>
                    <View key="5" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周五</Text></View>
                    <View key="6" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周六</Text></View>
                    <View key="7" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>周日</Text></View>
                    <View key="8" style={styles.tableTitle}><Text style={{textAlign: 'center'}}>时间</Text></View>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={ this.renderRow.bind(this) }
                />
                <Modal
                    title="课程详情"
                    visible={showCourseModal}
                    transparent
                    footer={null}
                    onClose={this.closeCourseModal.bind(this)}
                >
                    <View >
                        <Text>{rowData.course}</Text>
                        <View>
                            <Text>教室  {rowData.address}</Text>
                            <Text>上课时间  {rowData.time}</Text>
                            {
                                rowData.teacher ?
                                    <Text>授课教师  {rowData.teacher}</Text>
                                    :
                                    <Text>上课学生  {''}</Text>
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default connect(state => {
    return {
        schedule:state.schedule
    }
},dispatch=>bindActionCreators({ getSchedule, },dispatch))(Schedule)


const styles = StyleSheet.create({
    row: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',

        backgroundColor: 'skyblue'
    },
    col: {
        padding: 10,
        marginLeft: 2,
        borderBottomWidth:1,
        borderStyle: 'solid',
        flex: 1

    },
    tableTitle: {
        flex: 1,

    }

});