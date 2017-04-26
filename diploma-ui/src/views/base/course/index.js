import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Row, Col, Spin, Select, Input, Table, Modal, Radio} from 'antd';
import {ButtonGroup} from '../../../components/ButtonGroup';
import {getCourseList, modifyCourse, deleteCourse} from '../../../reducers/course';
import { getTeacherList } from '../../../reducers/teacher';
import {buttons, courseColumns} from './course.config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCourseModal: false,
            selectedRowKeys: [],
            selectedRows: [],
            record: {},
        };
        this.buttons = JSON.parse(JSON.stringify(buttons));
        this.columns = JSON.parse(JSON.stringify(courseColumns));
    }

    componentWillMount() {
        this.getNewColumn();
        this.props.getTeacherList();
    }

    componentDidMount() {
        this.onSearch();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.reload && nextProps.reload) {
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

            if (item.dataIndex === 'courseName') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }
            if (item.dataIndex === 'type') {
                item.render = (text, record) => <span>{text === '0' ? '主课' : '陪练课'}</span>
            }


        })
    }

    onSearch() {
        let searchData = this.props.form.getFieldsValue(['search.courseName']);
        this.props.getCourseList(searchData);
    }

    onAdd() {
        this.setState({showCourseModal: true});
    }

    onReset() {
        this.props.form.resetFields(['search.courseName']);
    }

    onDelete() {
        let {selectedRowKeys} = this.state;
        console.log(selectedRowKeys);
        this.props.deleteCourse({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys: [], selectedRows: []})
    }

    onLookDetail(record) {
        this.props.form.setFieldsValue({course: {...record}});
        this.setState({showCourseModal: true, record})
    }

    onSaveCourse() {
        let { record } = this.state;

        let data = this.props.form.getFieldsValue(['course']);
        let newData = record.id ? {...data.course, id: record.id} : {...data.course};
        this.props.modifyCourse(newData);


        this.props.form.resetFields(['course.courseName', 'course.courseCode', 'course.courseType', 'course.teacher', 'course.remark']);
        this.setState({showCourseModal: false, record: {}})
    }

    onCancel() {

        this.props.form.resetFields(['course.courseName', 'course.courseCode', 'course.courseType', 'course.teacher', 'course.remark']);
        this.setState({showCourseModal: false, record: {}})
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {selectedRows, selectedRowKeys, showCourseModal, } = this.state;
        const { course, teacherList} = this.props;

        const columns = this.columns;
        const buttons = this.getButtonStatus();

        let teacherOptions = teacherList && teacherList.length > 0 ? teacherList.map(item => {
            return <Option key={item.teacherName}>{item.teacherName}</Option>
        }) : [];


        let total = course.courseList.length;
        const pagination = {
            size: 'middle',
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            current: this.state.currentPage,
            showTotal: () => `共 ${total} 条`,
            onChange: (current) => {
                this.setState({currentPage: current})
            }
        };
        const rowSelection = {

            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {

                this.setState({selectedRows, selectedRowKeys});
            }
        };
        return (
            <div>
                <div className="controlWrapper wrapper">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="课程名"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}
                            >
                                {getFieldDecorator('search.courseName', {
                                    initialValue: ''
                                })(
                                    <Input placeholder="请输入课程名搜索"/>
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
                    title="课程信息"
                    visible={showCourseModal}
                    width={600}
                    maskClosable={false}
                    onOk={::this.onSaveCourse }
                    onCancel={ ::this.onCancel }
                >
                    <Row>
                        <Col span={12}>
                            <FormItem label="课程名" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('course.courseName', {
                                    rules: [{required: true, message: '请输入课程名'}]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="课程编号" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('course.courseCode', {
                                    rules: [{required: true, message: '请输入课程号'}]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="种类" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('course.courseType', {
                                    rules: [{required: true, message: '请选择种类'}],
                                    initialValue: 0
                                })(
                                    <RadioGroup>
                                        <Radio key="1" value={0}>主课</Radio>
                                        <Radio key="2" value={1}>陪练课</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="任课教师" labelCol={{span: 4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('course.teacher', {initialValue: undefined})(
                                    <Select
                                        mode='multiple'
                                        style={{width: '100%'}}
                                    >
                                        {teacherOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" labelCol={{span:4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('course.remark',{initialValue: ''})(
                                    <Input type="textarea" rows={3}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>

                <Spin spinning={course.loading} tip="正在读取数据...">
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={course.courseList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}

const CourseForm = Form.create()(Course);

export default connect((state) => {
    return {
        course: {...state.reducers.course},
        teacherList: state.reducers.teacher.teacherList,
    }
}, dispatch => bindActionCreators({getCourseList, modifyCourse, deleteCourse, getTeacherList}, dispatch))(CourseForm)
