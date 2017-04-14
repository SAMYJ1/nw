import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table, Modal, Spin, Form, Input, InputNumber, Select, Radio  } from 'antd';
import { getTeacherList, getTeacherDetail, modifySchedule, getStudentAndCourseList } from '../../../reducers/setSchedule';
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
        let searchData = this.props.form.getFieldsValue();
        this.props.getTeacherList(searchData);
    }
    onAdd(){
        this.setState({showTeacherModal: true})
    }
    onReset(){
        this.props.form.resetFields();
    }

    onLookDetail(){
        this.setState({showTeacherModal: true})
    }
    onLookSchedule(record){
        this.props.getTeacherDetail({teacherId: record.id });
        this.setState({showScheduleModal: true, record, title: 'modify'})
    }

    onSaveTeacher(){
        this.setState({showTeacherModal: false})
    }
    onCancelTeacher(){
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
        let { showScheduleModal, selectedRowKeys, showTeacherModal } = this.state;
        let { teacherList, teacherDetail, loading, stuAndCourList } = this.props;
        const buttons = this.getButtonStatus();
        const columns = this.columns;

        let courseOptions = stuAndCourList.courseList ? stuAndCourList.courseList.map(item=>{
            return <Option key={item}>{item}</Option>
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
                <div>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="名字"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 10}}
                            >
                                {getFieldDecorator('teacherName',{
                                    initialValue: ''
                                })(
                                    <Input/>
                                )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup dataProvider={ buttons } onClick={ ::this.onClickButton } />
                        </Col>
                    </Row>
                </div>

                <Modal width={1200} maskClosable={false}
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
                    width={600}
                    maskClosable={false}
                    visible={ showTeacherModal }
                    onOk={ ::this.onSaveTeacher }
                    onCancel={ ::this.onCancelTeacher }
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <Row>
                        <Col span={12}>
                            <FormItem label="姓名" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacherName',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="教师编号" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('teacherCode',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="性别" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('sex',{initialValue: 0})(
                                    <RadioGroup>
                                        <Radio value={0}>男</Radio>
                                        <Radio value={1}>女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="年龄" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('age',{initialValue: undefined})(
                                    <InputNumber min={18} max={60} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="联系方式" labelCol={{span:8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('tel',{initialValue: ''})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="所授课程" labelCol={{span:4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('course',{initialValue: ''})(
                                    <Select
                                        multiple
                                    >
                                        {courseOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" labelCol={{span:4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('remark',{initialValue: ''})(
                                    <Input/>
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
        ...state.reducers.setSchedule
    }
},(dispatch)=>(bindActionCreators({ getTeacherList, getTeacherDetail, modifySchedule, getStudentAndCourseList  },dispatch))
)(TeacherSchedule)