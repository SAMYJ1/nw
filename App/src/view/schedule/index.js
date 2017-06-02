import React, {Component} from 'react'
import { StyleSheet, View, Text, TextInput, Button, ListView, ScrollView,TouchableWithoutFeedback } from 'react-native';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { getSchedule } from '../../reducers/schedule';
import Icon from 'react-native-vector-icons/Ionicons';
import {List, TextareaItem} from 'antd-mobile'

/*const scheduleData = [
        {
            "monday": { 'course':'钢琴','students':['钱金辉','钱文浩'], 'teacher': null, 'address':'主楼203'},
            "tuesday": null,
            "wednesday": null,
            "thursday": null,
            "friday": null,
            "saturday": null,
            "sunday": { 'course':'吉他','students':['钱金辉'], 'teacher': null, 'address':'主楼202'},
            "time": '9:30-10:30',
        },
        {
            "monday": null,
            "tuesday": { 'course':'钢琴','students':null, 'teacher': 'tom','address':'主楼505'},
            "wednesday": null,
            "thursday": null,
            "friday": null,
            "saturday": null,
            "sunday": { 'course':'架子鼓','students':null, 'teacher': 'lucy', 'address':'主楼303'},
            "time": '9:00-10:00',
        }
    ];*/
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            rowData: {},
        };

    }
    static navigationOptions = ({navigation})=> ({
        title: '课表',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-calendar-outline" size={20} color={tintColor} />
        )
    });

    componentWillMount(){
        const {account, character} = this.props.user;
        this.props.getSchedule({account, character})
    }
    componentWillReceiveProps(nextProps){
        if (this.props.schedule.scheduleData !== nextProps.schedule.scheduleData){
            console.log(this.props.schedule, nextProps.schedule)
            this.setState({dataSource: ds.cloneWithRows(nextProps.schedule.scheduleData)})
        }
    }

    showCourseDetail(data, time){
        this.props.navigation.navigate('ShowCourseDetail',{...data,time})
    }
    onChangeRemark(value){

    }

    renderRow(rowData){
        let keys = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday','time'];

        return (
            <View style={styles.row}>
                {
                    keys.map((item,index)=>{
                        if ( item !== 'time' &&rowData[item]){
                            return (
                                <TouchableWithoutFeedback key={index} onPress={this.showCourseDetail.bind(this,rowData[item], rowData.time)}>
                                    <View key={index} style={styles.courseCell} >
                                        <Text key="1" style={{fontSize: 12, textAlign: 'center'}}>{rowData[item].course} @ {rowData[item].address}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }else if(item === 'time'){
                            return <View key={index} style={styles.timeCell}>
                                <Text style={{textAlign: 'center',fontSize:10,lineHeight:24}}>{rowData[item].slice(0,5)}</Text>
                                <Text style={{textAlign: 'center',}}>-</Text>
                                <Text style={{textAlign: 'center',fontSize:10,lineHeight:24}}>{rowData[item].slice(6)}</Text>
                            </View>
                        } else {
                            return <View key={index} style={styles.col}/>
                        }
                    })
                }

            </View>
        )
    }

    render(){
        const {dataSource, rowData } = this.state;
        const confirm = false;

        return(

            <View style={{flex: 1, paddingTop: 22, backgroundColor: 'snow'}}>
                <ScrollView>
                    <View style={{ height: 40,  flexDirection: 'row',backgroundColor: '#a4dbff', paddingTop: 10, marginBottom: 2}}>
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
                    {
                        confirm?
                            ''
                            :
                            <View style={styles.confirmBox}>
                                <View>
                                    <Text>备注</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.confirmTextInput}
                                        multiline={true}
                                        onChangeText={this.onChangeRemark.bind(this)}
                                        underlineColorAndroid='transparent'
                                        numberOfLines={4}
                                    />
                                </View>
                            </View>
                    }

                </ScrollView>


            </View>
        )
    }
}

export default connect(state => {
    return {
        schedule:state.schedule,
        user: state.user,
    }
},dispatch=>bindActionCreators({ getSchedule, },dispatch))(Schedule)


const styles = StyleSheet.create({
    row: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',

        backgroundColor: '#f1fffd'
    },
    col: {
        padding: 10,
        marginLeft: 2,
        margin: .5,
        flex: 1,
        backgroundColor: '#e4e5ee'

    },
    courseCell: {
        padding: 10,
        marginLeft: 2,
        margin: .5,
        flex: 1,
        borderRadius: 2,
        backgroundColor: '#43ffaa'
    },
    timeCell: {
        padding: 10,
        marginLeft: 2,
        margin: .5,
        flex: 1,
        backgroundColor: '#ffa1ad'
    },
    tableTitle: {
        flex: 1,
    },
    confirmBox: {

    },
    confirmTextInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '70%',
        marginLeft: 5,
        marginRight: 5,
        // height: 120,
        borderRadius: 3,
    }

});
