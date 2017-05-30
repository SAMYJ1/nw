import React, { Component } from 'react';
import {  Select, Input, Icon,} from 'antd';
import style from './editable.less';

const Option = Select.Option;

export default class MulSelEditableCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            students: [],
            course: '',
            address: '',
            editable: false,
            studentList: [],
            courseList: [],
        };

    }
    
    componentDidMount(){
        if (this.props.value){

            let { students, course, address } = this.props.value;
            this.setState({ students, course, address})
        }
        if (this.props.record){
            let {courseList, studentList } = this.props.record;
            this.setState({courseList, studentList})
        }

    }
    componentWillReceiveProps(nextProps){

        if (this.props.value !== nextProps.value){
            let { students, course, address } = nextProps.value;
            this.setState({students, course, address});
        }
        if (this.props.record.courseList !== nextProps.record.courseList ){
            let {courseList } = nextProps.record;
            this.setState({courseList,})
        }
        if (this.props.record.studentList !== nextProps.record.studentList){
            let {studentList} = nextProps.record;
            this.setState({studentList})
        }

    }


    onStudentChange(value){
        console.info(value);
        this.setState({ students:value })
    }
    onCourseChange(value){
        console.log(value)
        this.setState({ course:value === undefined ? '': value })
    }
    onAddressChange(e){
        let address = e.target.value;
        this.setState({ address })
    }

    check(){
        let { address, course, students} = this.state;
        this.setState({editable: false});
        if (this.props.onChange){
            // this.props.onChange(this.state.value)
            this.props.onChange({course, students, address})
        }
    }
    edit(){
        this.setState({editable: true})
    }

    render(){
        let { editable, address, course, students, studentList, courseList } = this.state;

        let cellStr = course && address && students.length > 0 ? <div><p>课程：{course}</p><p>地点：{address}</p><p>学生：{students.join('、')}</p></div>: '';

        let stuChildren = studentList ? studentList.map((item,index)=>{
            return <Option key={index} value={item}>{item}</Option>
        }) : [];
        let courseChildren = courseList ? courseList.map((item,index)=>{
            return <Option key={index} value={item}>{item}</Option>
        }) : [];

        return (
            <div className={style.editableCell}>
                {
                    editable ?
                        <div className={style.editableCellInputWrapper}>
                            <div>
                                <label>课程:</label>
                                <Select
                                    allowClear
                                    defaultValue={course}
                                    style={{ width: '100%' }}
                                    onChange={ ::this.onCourseChange }
                                >
                                    {courseChildren}
                                </Select>
                            </div>
                            <div>
                                <label>地点:</label>
                                <Input
                                    value={ address }
                                    onChange={ ::this.onAddressChange }
                                    onPressEnter={ ::this.check}
                                />
                            </div>
                            <div>
                                <label>学生:</label>
                                <Select
                                    tags
                                    multiple
                                    defaultValue={students}
                                    style={{ width: '100%' }}
                                    onChange={ ::this.onStudentChange }
                                >
                                    {stuChildren}
                                </Select>
                            </div>

                            <Icon type="check" className={style.editableCellIconCheck} onClick={ ::this.check}/>
                        </div>
                        :
                        <div className={style.editableCellTextWrapper}>
                            { cellStr }
                            <Icon type="edit" className={style.editableCellIcon} onClick={ ::this.edit}/>
                        </div>
                }
            </div>
        )
    }
}