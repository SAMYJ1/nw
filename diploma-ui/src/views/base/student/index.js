import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table, Form, Select, Spin, Input, Radio, Modal } from 'antd'
import { ButtonGroup } from '../../../components/ButtonGroup';
import { getStudentList, delStudent, modifyStudent, getAllCourse } from '../../../reducers/student';
import { studentColumn, buttons } from './student.config';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            showStudentModal: false,
            record: {},
        };
        this.columns = JSON.parse(JSON.stringify(studentColumn));
        this.buttons = JSON.parse(JSON.stringify(buttons));
    }
    componentWillMount(){
        this.props.getAllCourse();
        this.getNewColumn();
    }
    componentDidMount(){
        this.onSearch();
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.student.reload && nextProps.student.reload){
            this.onSearch();
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

            if (item.dataIndex === 'account') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }
            if (item.dataIndex === 'sex'){
                item.render = text => text === 0 ? '男' : '女';
            }
            if (item.dataIndex === 'course'){
                item.render = text => text.join('、')
            }

        })
    }

    onSearch(){
        let searchData = this.props.form.getFieldsValue(['account']);
        this.props.getStudentList(searchData);
    }
    onAdd(){
        this.setState({showStudentModal: true});
    }
    onReset(){
        this.props.form.resetFields(['account']);
    }
    onDelete(){
        let { selectedRowKeys } = this.state;
        console.log(selectedRowKeys);
        this.props.delStudent({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys:[], selectedRows:[]})
    }
    onLookDetail(record){
        this.props.form.setFieldsValue({student:{...record}});
        this.setState({showStudentModal: true, record})
    }

    onSaveStudent(){
        let { record } = this.state;

        let data = this.props.form.getFieldsValue(['student']);

        let newData = record.id ? {...data.student, id: record.id}: {...data.student};
        this.props.modifyStudent(newData);
        console.info(data)

        this.props.form.resetFields();
        this.setState({showStudentModal:false, record: {}})
    }
    onCancelSave(){
        this.props.form.resetFields();
        this.setState({showStudentModal:false, record: {}})
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { showStudentModal, selectedRowKeys, } = this.state;
        const { loading, studentList, courseList } = this.props.student;

        const columns = this.columns;
        const buttons = this.getButtonStatus();
        const levels = [
            {label: '1',value: '1'},
            {label: '2',value: '2'},
            {label: '3',value: '3'},
        ];

        let courseOptions = courseList ? courseList.map((item,index)=>{
            return <Option key={index} value={item}>{item}</Option>
        }): [];
        let levelOptions = levels ? levels.map(item=><Option key={item.value}>{item.label}</Option>) : [];

        let total = studentList.length;
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
                                {getFieldDecorator('account', {
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
                    width={600}
                    title="学员信息"
                    maskClosable={false}
                    visible={showStudentModal}
                    onOk={ ::this.onSaveStudent }
                    onCancel={ ::this.onCancelSave }
                    okText="保存"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={12}>
                            <FormItem label="姓名" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.account',{
                                    rules: [{ required: true, message: '请输入姓名' }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="学校" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.school',{
                                    initialValue:undefined
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="性别" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.sex',{
                                    rules: [{ required: true, message: '请选择姓名' }],
                                })(
                                    <RadioGroup>
                                        <Radio key="1" value={0}>男</Radio>
                                        <Radio key="2" value={1}>女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="联系方式" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.tel',{
                                    rules: [{ required: true, message: '请输入联系方式' }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="年龄" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.age',{
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="等级" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.level',{
                                    initialValue:undefined
                                })(
                                    <Select style={{width: '100%'}}>
                                        {levelOptions}
                                    </Select>

                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="家长联系方式" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('student.parentTel',{
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={24}>
                            <FormItem label="报名课程" labelCol={{span:4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('student.course',{initialValue: undefined})(
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
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" labelCol={{span:4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('student.remark',{initialValue: ''})(
                                    <Input type="textarea" rows={3}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>

                <Spin spinning={loading} tip="正在读取数据...">
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={studentList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}

const StudentInfo = Form.create()(Student);

export default connect(state=>{
    return {
        student: {...state.reducers.student},
    }
},dispatch=>(bindActionCreators({ getStudentList, delStudent, modifyStudent, getAllCourse },dispatch))
)(StudentInfo);