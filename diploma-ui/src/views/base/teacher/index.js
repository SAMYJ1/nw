import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table, Modal, Spin, Form, Input, InputNumber, Select, Radio  } from 'antd';
import { getTeacherList, getTeacherDetail, delTeacher, modifySchedule, modifyTeacher, getStudentAndCourseList } from '../../../reducers/teacher';
import Schedule from '../../../components/scheduleTable'
import { ButtonGroup } from '../../../components/ButtonGroup';
import { buttons,teacherColumn } from './schedule.config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class Teacher extends Component{
    constructor(props){
        super(props);
        this.state = {
            showScheduleModal: false,
            showTeacherModal: false,
            selectedRowKeys:[],
            selectedRows: [],
            record: {},
            title: '',
        };

        this.columns= JSON.parse(JSON.stringify(teacherColumn));
        this.buttons = JSON.parse(JSON.stringify(buttons))


    }

    componentWillMount(){
        this.getNewColumn();
    }

    componentDidMount(){

        this.onSearch();
        this.props.getStudentAndCourseList();
    }
    componentWillUpdate(nextProps, nextState){
        let { showScheduleModal, title, record } = this.state;
        if ( !showScheduleModal && nextState.showScheduleModal && title === 'modify'){

        }
    }
    componentWillReceiveProps(nextProps){

    }


    onClickButton(e) {

        let action = e.action;

        switch (action) {

            case 'search':
                this.onSearch();
                break;

            case 'add':
                this.onAdd();
                break;
            case 'reset':
                this.onReset();
                break;
            case 'delete':
                this.onDelete();
                break;

        }
    }
    getButtonStatus() {

        let {selectedRows} = this.state;

        let {buttons} = this;

        let len = selectedRows.length;


        return buttons.map(function (button) {

            let {action} = button;

            switch (action) {

                case 'delete':

                    button.disabled = (len !== 1);

                    break;

            }
            return button;
        });
    }

    getNewColumn() {

        this.columns.find((item) => {

            if (item.dataIndex === 'teacherName') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }
            if (item.dataIndex === 'course') {
                item.render = (text, record) => {
                    return (<a onClick={this.onLookSchedule.bind(this, record)}>{text}</a>);
                }
            }
        })
    }

    onSearch(){
        let searchData = this.props.form.getFieldValue('name');
        console.info(searchData)
        this.props.getTeacherList({name:searchData});
    }
    onAdd(){
        this.setState({showTeacherModal: true})
    }
    onReset(){
        this.props.form.resetFields(['name']);
    }
    onDelete(){
        let { selectedRowKeys } = this.state;
        console.log(selectedRowKeys);
        this.props.delTeacher({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys:[], selectedRows:[]})
    }

    onLookDetail(record){
        this.props.form.setFieldsValue({teacher:{...record}});
        this.setState({showTeacherModal: true})
    }
    onLookSchedule(record){
        this.props.getTeacherDetail({teacherId: record.id });
        this.setState({showScheduleModal: true, record, title: 'modify'})
    }

    onSaveTeacher(){
        let teacherInfo = this.props.form.getFieldsValue();

        this.props.modifyTeacher(teacherInfo.teacher);
        this.props.form.resetFields();
        this.setState({showTeacherModal: false})
    }
    onCancelTeacher(){
        this.props.form.resetFields();
        this.setState({showTeacherModal: false})
    }

    onSaveSchedule(){
        let data = this.refs.scheduleComponent.backupData();
        console.log("the backup data is: ",data);

        this.props.modifySchedule(data);
        this.setState({showScheduleModal:false})
    }
    onCancelSave(){
        this.setState({showScheduleModal:false})
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { showScheduleModal, selectedRowKeys, selectedRows, showTeacherModal } = this.state;
        let { teacherList, teacherDetail, loading, stuAndCourList } = this.props;
        const buttons = this.getButtonStatus();
        const columns = this.columns;

        let courseOptions = stuAndCourList.courseList ? stuAndCourList.courseList.map((item,index)=>{
            return <Option key={index} value={item}>{item}</Option>
        }): [];

        let total = teacherList.length;
        const pagination = {
            size: 'middle',
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            current:this.state.currentPage,
            showTotal: () => `共 ${total} 条`,
            onChange: (current) => {
                this.setState({currentPage: current})
            }
        };
        const rowSelection = {

            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {

                this.setState({ selectedRows, selectedRowKeys });
            }
        };
        return (
            <div>
                <div className="controlWrapper wrapper">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="名字"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}
                            >
                                {getFieldDecorator('name',{
                                    initialValue: ''
                                })(
                                    <Input/>
                                )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="buttonWrapper">
                            <ButtonGroup dataProvider={ buttons } onClick={ ::this.onClickButton } />
                        </Col>
                    </Row>
                </div>

                <Modal
                title="课程信息"
                key={1}
                width={1200}
                maskClosable={false}
                loading={false}
                visible={ showScheduleModal }
                onOk={ ::this.onSaveSchedule }
                onCancel={ ::this.onCancelSave }
                okText={'保存'}
                cancelText={'取消'}
                >
                    <div>
                        <Schedule ref="scheduleComponent" dataSource={teacherDetail} studentList={stuAndCourList.studentList} />
                    </div>
                </Modal>

                <Modal
                    title="教师信息"
                    key={2}
                    width={600}
                    maskClosable={false}
                    visible={ showTeacherModal }
                    onOk={ ::this.onSaveTeacher }
                    onCancel={ ::this.onCancelTeacher }
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <Row key={1}>
                        <Col key={1} span={12}>
                            <FormItem label="姓名" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacher.teacherName',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col key={2} span={12}>
                            <FormItem label="教师编号" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacher.teacherCode',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row key={2}>
                        <Col key={1} span={12}>
                            <FormItem label="性别" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacher.sex',{initialValue: 0})(
                                    <RadioGroup>
                                        <Radio key="1" value={0}>男</Radio>
                                        <Radio key="2" value={1}>女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col key={2} span={12}>
                            <FormItem label="年龄" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacher.age',{initialValue: undefined})(
                                    <InputNumber min={18} max={60} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row key={3}>
                        <Col span={12}>
                            <FormItem label="联系方式" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacher.tel',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row key={4}>
                        <Col span={24}>
                            <FormItem label="所授课程" labelCol={{span:4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('teacher.course',{initialValue: undefined})(
                                    <Select
                                        mode='multiple'
                                        style={{width: '100%'}}
                                    >
                                        {courseOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row key={5}>
                        <Col span={24}>
                            <FormItem label="备注" labelCol={{span:4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('teacher.remark',{initialValue: ''})(
                                    <Input type="textarea" rows={3}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                </Modal>

                <Spin spinning={ loading } tip="正在读取数据...">
                    <Table
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={teacherList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}

const TeacherSchedule = Form.create()(Teacher);

export default connect((state)=>{
    return {
        ...state.reducers.teacher
    }
},(dispatch)=>(bindActionCreators({ getTeacherList, getTeacherDetail, delTeacher, modifyTeacher, modifySchedule, getStudentAndCourseList  },dispatch))
)(TeacherSchedule)