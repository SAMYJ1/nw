import React , {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {List, InputItem, WhiteSpace, Toast, TextareaItem , Picker, Checkbox} from 'antd-mobile';
import { createForm } from 'rc-form';
import { modifyStudent } from '../../reducers/student'

const CheckboxItem = Checkbox.CheckboxItem;

class StudentDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCourse: []
        }

    }
    static navigationOptions = ({navigation})=> ({
        title: '学员信息',
        headerRight: (
            <Text onPress={() => {navigation.state.params.saveStudent()}}>保存   </Text>
        ),
    });
    componentDidMount(){
        const { params } = this.props.navigation.state;
        let selectedCourse = params.student ? params.student.course : [];
        this.setState({selectedCourse});

        if (params.method === 'modify'){
            this.props.form.setFieldsValue({...params.student, sex: [params.student.sex]})
        }
        this.props.navigation.setParams({saveStudent: this.onSaveStudent.bind(this)})
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

    onSaveStudent(){
        const {selectedCourse} = this.state;
        const { params } = this.props.navigation.state;
        const formData = this.props.form.getFieldsValue();
        let newData = params.method === 'modify' ? {...params.student, ...formData, sex: formData.sex[0], course: selectedCourse} : {...formData, sex: formData.sex[0], course: selectedCourse};

        Toast.loading('', 0)
        this.props.modifyStudent({...newData});


    }

    changeSelectCourse(value, e){
        let checked = e.target.checked;
        const {selectedCourse} = this.state;
        let idx = selectedCourse.indexOf(value);
        if (checked && idx === -1){
            selectedCourse.push(value)
        } else if (!checked && idx !== -1){
            selectedCourse.splice(idx, 1)
        }
        this.setState({selectedCourse})


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

                            <InputItem
                                {...getFieldProps('school')}
                                clear
                            >学校</InputItem>

                            <InputItem
                                {...getFieldProps('tel', {
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true}],
                                })}
                                clear
                            >联系方式</InputItem>
                            <InputItem
                                {...getFieldProps('parentTel', {
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true}],
                                })}
                                clear
                            >家长电话</InputItem>
                            <InputItem
                                {...getFieldProps('age')}
                                clear
                            >年龄</InputItem>
                            <InputItem
                                {...getFieldProps('remark')}
                                clear
                            >备注</InputItem>


                        </List>
                        <List renderHeader={()=> '课程'}>
                            <List.Item >
                                {
                                    params.courseList.map(item=>
                                        <CheckboxItem
                                            key={item}
                                            defaultChecked={ params.student && params.student.course.indexOf(item) !== -1}
                                            onChange={this.changeSelectCourse.bind(this, item)}
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

const studentDetailForm = createForm()(StudentDetail);

export default connect(state => {
    return {
        ...state.student
    }
}, dispatch=> bindActionCreators({ modifyStudent }, dispatch))(studentDetailForm)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'snow',
    }
});