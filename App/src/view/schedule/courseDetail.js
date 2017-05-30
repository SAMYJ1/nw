import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconTime from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export default class CourseDetail extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static navigationOptions = ({navigation})=>({
        title: '课程详情',
    });

    lookStudentList(students){
        this.props.navigation.navigate('Students',{students: students})
    }

    render(){
        const { params } = this.props.navigation.state;
        console.log(params)

        return(
            <View>
                <View>
                    <View style={styles.courseView}>
                        <Text style={styles.courseText}>{params.course}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Text><Icon name="location" size={20} color="skyblue"/> 教室         {params.address}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Text> <IconTime name="ios-time-outline" size={15} color="skyblue"/> 上课时间   {params.time}</Text>
                    </View>
                    {
                        params.teacher?
                            <View style={styles.touchableView}>
                                <Text><Icon name="user" size={20} color="skyblue"/>  授课教师</Text>
                                <Text style={{textAlign: 'right', flex: 1, marginRight: 20}}>{params.teacher}</Text>
                            </View>
                            :
                            <TouchableHighlight underlayColor="transparent" activeOpacity={.5} onPress={this.lookStudentList.bind(this, params.students)}>
                                <View style={styles.touchableView}>
                                    <Text><SimpleLineIcons name="people" size={20} color="skyblue"/>  上课学生</Text>
                                    <Text style={{textAlign: 'right', flex: 1, marginRight: 20, lineHeight: 20}}>{params.students.length} 人     </Text>
                                    <Icon  name="chevron-right" size={28}/>
                                </View>
                            </TouchableHighlight>

                    }
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    courseView: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 20,
        backgroundColor: 'snow'
    },
    courseText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    rowItem: {

        paddingBottom: 10,
        flexDirection: 'row',
        paddingLeft: 20,
        backgroundColor: 'snow'
    },
    touchableView: {
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: 'snow'
    }
});