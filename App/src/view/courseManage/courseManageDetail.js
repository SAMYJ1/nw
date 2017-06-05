import React , {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {List, InputItem, WhiteSpace, Toast, TextareaItem , Picker, Checkbox} from 'antd-mobile';
import { createForm } from 'rc-form';
import { modifyCourse } from '../../reducers/courseManage'

const CheckboxItem = Checkbox.CheckboxItem;

class CourseManageDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTeacher: []
        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '课程详情',
        headerRight: (
            <Text onPress={() => {navigation.state.params.saveCourse()}}>保存   </Text>
        ),
    });
    componentDidMount(){
        const { params } = this.props.navigation.state;
        let selectedTeacher = params.course ? params.course.teacher : [];
        this.setState({selectedTeacher});

        if (params.method === 'modify'){
            this.props.form.setFieldsValue({...params.course})
        }
        this.props.navigation.setParams({saveCourse: this.onSaveCourse.bind(this)})
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.modifySuccess && nextProps.modifySuccess){
            Toast.hide();
            Toast.success('保存成功',0)
            setTimeout(()=>{
                Toast.hide()
            },1000)
        }
    }

    onSaveCourse(){
        const {selectedTeacher} = this.state;
        const { params } = this.props.navigation.state;
        const formData = this.props.form.getFieldsValue();
        let newData = params.method === 'modify' ? {...params.course, ...formData, teacher: selectedTeacher} : {...formData, teacher: selectedTeacher};

        Toast.loading('', 0, null, false)
        this.props.modifyCourse({...newData});


    }

    changeSelectTeacher(value, e){
        let checked = e.target.checked;
        const {selectedTeacher} = this.state;
        let idx = selectedTeacher.indexOf(value);
        if (checked && idx === -1){
            selectedTeacher.push(value)
        } else if (!checked && idx !== -1){
            selectedTeacher.splice(idx, 1)
        }
        this.setState({selectedTeacher})


    }


    render(){
        const { params } = this.props.navigation.state;
        const { getFieldProps } = this.props.form;


        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <List renderHeader={() => '基本信息'}>
                            <InputItem
                                {...getFieldProps('courseName', {
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true}],
                                })}
                                clear
                            >姓名</InputItem>

                            <InputItem
                                {...getFieldProps('courseCode')}
                                clear
                            >课程编号</InputItem>

                            <InputItem
                                {...getFieldProps('remark')}
                                clear
                            >备注</InputItem>


                        </List>
                        <List renderHeader={()=> '教师'}>
                            <List.Item >
                                {
                                    params.teacherList.map(item=>
                                        <CheckboxItem
                                            key={item}
                                            defaultChecked={ params.course && params.course.teacher.indexOf(item) !== -1}
                                            onChange={this.changeSelectTeacher.bind(this, item)}
                                        >
                                            {item}
                                        </CheckboxItem>
                                    )
                                }

                            </List.Item>

                        </List>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const courseDetailForm = createForm()(CourseManageDetail);

export default connect(state => {
    return {
        ...state.courseManage
    }
}, dispatch=> bindActionCreators({ modifyCourse }, dispatch))(courseDetailForm)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'snow',
    }
});