import React , {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {List, InputItem, WhiteSpace, Toast, TextareaItem , Picker, Checkbox} from 'antd-mobile';
import { createForm } from 'rc-form';
import { modifyTeacher } from '../../reducers/teacher'

const CheckboxItem = Checkbox.CheckboxItem;

class TeacherDetail extends Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '教师信息',
        headerRight: (
            <Text onPress={() => {navigation.state.params.saveTeacher()}}>保存   </Text>
        ),
    });
    componentDidMount(){
        const { params } = this.props.navigation.state;

        if (params.method === 'modify'){
            this.props.form.setFieldsValue({...params.teacher, sex: [params.teacher.sex], teacherType: [params.teacher.teacherType]})
        }
        this.props.navigation.setParams({saveTeacher: this.onSaveTeacher.bind(this)})
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.modifySuccess && nextProps.modifySuccess){
            Toast.hide();
            Toast.success('保存成功',2)
            setTimeout(()=>{
                Toast.hide()
            },1000)
        }
    }

    onSaveTeacher(){
        const { params } = this.props.navigation.state;
        const formData = this.props.form.getFieldsValue();
        let newData = params.method === 'modify' ? {...params.teacher, ...formData, sex: formData.sex[0], teacherType: formData.teacherType[0]} : {...formData, sex: formData.sex[0], course: selectedCourse};

        Toast.loading('', 0)
        this.props.modifyTeacher({...newData});


    }




    render(){
        const { params } = this.props.navigation.state;
        const { getFieldProps } = this.props.form;

        const sexOption = [
            {
                label: '男',
                value: 1,
            },
            {
                label: '女',
                value: 0,
            }
        ];
        const teacherTypeOption = [
            {
                label: '主教师',
                value: 0,
            },
            {
                label: '陪练教师',
                value: 1,
            }
        ];

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <List renderHeader={() => '基本信息'}>
                            <InputItem
                                {...getFieldProps('account', {
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true}],
                                })}
                                clear
                            >姓名</InputItem>
                            <Picker itemStyle={{flexDirection:'left'}} data={sexOption} cols={1} {...getFieldProps('sex')} className="forss">
                                <List.Item arrow="horizontal">性别</List.Item>
                            </Picker>
                            <Picker itemStyle={{flexDirection:'left'}} data={teacherTypeOption} cols={1} {...getFieldProps('teacherType')} className="forss">
                                <List.Item arrow="horizontal">教师类型</List.Item>
                            </Picker>

                            <InputItem
                                {...getFieldProps('tel', {
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true}],
                                })}
                                clear
                            >联系方式</InputItem>

                            <InputItem
                                {...getFieldProps('age')}
                                clear
                            >年龄</InputItem>
                            <InputItem
                                {...getFieldProps('remark')}
                                clear
                            >备注</InputItem>


                        </List>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const teacherDetailForm = createForm()(TeacherDetail);

export default connect(state => {
    return {
        ...state.teacher
    }
}, dispatch=> bindActionCreators({ modifyTeacher }, dispatch))(teacherDetailForm)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'snow',
    }
});