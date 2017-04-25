import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Row, Col, Spin, Select, Input, Table, Modal} from 'antd';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { getCourseList, modifyCourse, deleteCourse } from '../../../reducers/course';
import { buttons, courseColumns } from './course.config';

const FormItem = Form.Item;

class Course extends Component{
    constructor(props){
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

    componentWillMount(){
        this.getNewColumn();
    }
    componentDidMount(){
        this.onSearch();
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.reload && nextProps.reload){
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

            if (item.dataIndex === 'accountCode') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }


        })
    }

    onSearch(){
        let searchData = this.props.form.getFieldsValue(['search.courseName']);
        this.props.getCourseList(searchData);
    }
    onAdd(){
        this.setState({showCourseModal: true});
    }
    onReset(){
        this.props.form.resetFields(['search.courseName']);
    }
    onDelete(){
        let { selectedRowKeys } = this.state;
        console.log(selectedRowKeys);
        this.props.deleteCourse({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys:[], selectedRows:[]})
    }
    onLookDetail(record){
        this.props.form.setFieldsValue({course:{...record}});
        this.setState({showCourseModal: true, record})
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const { selectedRows, selectedRowKeys, showCourseModal } = this.state;
        const { loading, courseList } = this.props;

        const columns = this.columns;
        const buttons = this.getButtonStatus();


        let total = courseList.length;
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
                                label="课程名"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}
                            >
                                {getFieldDecorator('search.courseName', {
                                    initialValue: ''
                                })(
                                    <Input placeholder="请输入课程名搜索" />
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

                <Spin spinning={loading} tip="正在读取数据...">
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={courseList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}

const CourseForm = Form.create()(Course);

export default connect((state)=>{
    return {
        ...state.reducers.course
    }
},dispatch=>bindActionCreators({ getCourseList, modifyCourse, deleteCourse },dispatch))(CourseForm)
