import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table, Modal, Spin, Form, Input, InputNumber, Select, Radio  } from 'antd';
import { getTeacherList, getTeacherDetail, delTeacher, modifySchedule, modifyTeacher, getStudentAndCourseList } from '../../../reducers/teacher';
import { resetPassword } from '../../../reducers/user';
import Schedule from '../../../components/scheduleTable'
import { ButtonGroup } from '../../../components/ButtonGroup';
import { buttons,teacherColumn } from './schedule.config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

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
    }
    componentWillUpdate(nextProps, nextState){


    }
    componentWillReceiveProps(nextProps){
        if (!this.props.reload && nextProps.reload){
            this.onSearch()
        }
        if (!this.props.studentListReady && nextProps.studentListReady && (this.props.stuAndCourList !==nextProps.stuAndCourList)){
            this.setState({showScheduleModal: true, record:this.state.selectedRows[0], title: 'modify'})
        }
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
            case 'lookSchedule':
                this.onLookSchedule();
                break;
            case 'resetPwd':
                this.resetPwd();
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
                case 'lookSchedule':
                    button.disabled = (len !== 1);
                    break;
                case 'resetPwd':
                    button.disabled = (len !== 1);

                    break
            }
            return button;
        });
    }

    getNewColumn() {

        this.columns.find((item) => {

            if (item.dataIndex === 'account') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }
            if (item.dataIndex === 'sex'){
                item.render = (text)=> <span>{text === 0 ? '女': '男'}</span>

            }

            if (item.dataIndex === 'teacherType'){
                item.render = (text)=> <span>{text === 0 ? '主教师': '陪练教师'}</span>
            }
        })
    }

    onSearch(){
        let searchData = this.props.form.getFieldValue('name');
        this.props.getTeacherList({account:searchData});
    }
    onAdd(){
        this.setState({showTeacherModal: true})
    }
    onReset(){
        this.props.form.resetFields(['name']);
    }
    onDelete(){
        let { selectedRowKeys, selectedRows } = this.state;

        confirm({
            title: '是否确认删除？',

            onOk:()=>{
                this.props.delTeacher({account: selectedRows[0].account});
                this.setState({selectedRowKeys:[], selectedRows:[]})
            },
            onCancel(){},
        })

    }
    resetPwd() {
        let {selectedRows} = this.state;
        confirm({
            title: '是否重置密码？',

            onOk:()=>{
                this.props.resetPassword({account: selectedRows[0].account, character: 'teacher'});
            },
            onCancel(){},
        })

    }

    onLookDetail(record){
        this.props.form.setFieldsValue({teacher:{...record}});
        this.setState({showTeacherModal: true, record})
    }
    onLookSchedule(){
        const record = this.state.selectedRows[0];
        this.props.getTeacherDetail({account: record.account, character: 'teacher' });
        this.props.getStudentAndCourseList({account: record.account});

    }

    onSaveTeacher(){
        const { record } = this.state;
        let teacherInfo = this.props.form.getFieldsValue();
        let newData = record.id ? {...teacherInfo.teacher,id:record.id}: {...teacherInfo.teacher}
        this.props.modifyTeacher(newData);

        this.props.form.resetFields();
        this.setState({showTeacherModal: false, record: {}})
    }
    onCancelTeacher(){
        this.props.form.resetFields();
        this.setState({showTeacherModal: false, record: {}})
    }

    onSaveSchedule(){
        const {record} = this.state;
        let data = this.refs.scheduleComponent.backupData();
        console.log("the backup data is: ",data);
        let finalData = this.formatData(data.dataSource, record.account);


        this.props.modifySchedule(finalData);
        this.setState({showScheduleModal:false, record: {}, selectedRows:[], selectedRowKeys:[]})
    }
    onCancelSave(){
        this.setState({showScheduleModal:false, record: {}})
    }

    formatData(data, teacher){
        let arr = [];
        for (let dataItem of data){
            delete dataItem.courseList;
            delete dataItem.id;
            delete dataItem.studentList;
            let time = dataItem.time;
            delete dataItem.time;

            Object.entries(dataItem).forEach(item=>{
                if (item[1] !== null && item[1].course !== '' && item[1].address !== '' && item[1].students.length > 0 && time !== '-'){
                    let obj = {...item[1],time, week: item[0], teacher};
                    arr.push(obj)
                }
            })
        }
        return arr
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { showScheduleModal, selectedRowKeys, showTeacherModal } = this.state;
        let { teacherList, teacherDetail, detailLoading, tableLoading, stuAndCourList, } = this.props;
        const buttons = this.getButtonStatus();
        const columns = this.columns;

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
            <Spin spinning={detailLoading} tip="正在读取数据...">
                <div>
                    <div className="controlWrapper wrapper">
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="名字"
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 16}}
                                >
                                    {getFieldDecorator('name', {
                                        initialValue: ''
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="buttonWrapper">
                                <ButtonGroup dataProvider={ buttons } onClick={ ::this.onClickButton }/>
                            </Col>
                        </Row>
                    </div>

                    <Modal
                        title="设置课表"
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
                            <Schedule ref="scheduleComponent" dataSource={teacherDetail}
                                      studentList={stuAndCourList.studentList || []}/>
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
                                <FormItem label="姓名" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    {getFieldDecorator('teacher.account', {initialValue: ''})(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col key={2} span={12}>
                                <FormItem label="教师类型" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                                    {getFieldDecorator('teacher.teacherType', {initialValue: 0})(
                                        <RadioGroup>
                                            <Radio key="1" value={0}>主教师</Radio>
                                            <Radio key="2" value={1}>陪练教师</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row key={2}>
                            <Col key={1} span={12}>
                                <FormItem label="性别" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    {getFieldDecorator('teacher.sex', {initialValue: 0})(
                                        <RadioGroup>
                                            <Radio key="1" value={1}>男</Radio>
                                            <Radio key="2" value={0}>女</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col key={2} span={12}>
                                <FormItem label="年龄" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                                    {getFieldDecorator('teacher.age', {initialValue: undefined})(
                                        <InputNumber min={18} max={60}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row key={3}>
                            <Col span={12}>
                                <FormItem label="联系方式" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    {getFieldDecorator('teacher.tel', {initialValue: ''})(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row key={5}>
                            <Col span={24}>
                                <FormItem label="备注" labelCol={{span: 4}} wrapperCol={{span: 18}}>
                                    {getFieldDecorator('teacher.remark', {initialValue: ''})(
                                        <Input type="textarea" rows={3}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                    </Modal>

                    <Spin spinning={ tableLoading } tip="正在读取数据...">
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
            </Spin>
        )
    }
}

const TeacherSchedule = Form.create()(Teacher);

export default connect((state)=>{
    return {
        ...state.reducers.teacher
    }
},(dispatch)=>(bindActionCreators({ getTeacherList, getTeacherDetail, delTeacher, modifyTeacher, modifySchedule, getStudentAndCourseList , resetPassword },dispatch))
)(TeacherSchedule)