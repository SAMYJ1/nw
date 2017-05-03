import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Row, Col, Table, Modal, Spin, Form, Button, Input } from 'antd';
import { getPersonalSchedule, confirmSchedule, } from '../../../reducers/schedule';
import { scheduleColumns } from './schedule.config';
import style from './index.less';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDisabled: false
        };

        this.columns = JSON.parse(JSON.stringify(scheduleColumns));
    }

    componentWillMount(){
        this.getNewColumn();
    }
    componentDidMount(){
        this.onSearch()
    }

    getNewColumn(){
        this.columns.find((item,index)=>{
            if (item.dataIndex !== 'time'){
                item.render = (text, record)=>{
                    if (text){
                        return (
                            <div>
                                <p>课程: {text.course}</p>
                                <p>地点: {text.address}</p>
                                {
                                    text.students ?
                                        <p>{text.students.length < 3 ? `学生: ${text.students.join('、')}` : ''}</p>
                                        :
                                        <p>{`老师: ${text.teacher}`}</p>
                                }
                            </div>
                        )
                    }

                }
            }

        })
    }

    onSearch(){
        this.props.getPersonalSchedule()
    }

    onConfirm(){
        confirm({
            title: '是否确认？',
            content: '确认后不可更改，请谨慎选择！',
            onOk:()=>{
                this.props.confirmSchedule({confirm: true});
                this.setState({confirmDisabled: true})
            },
            onCancel(){},
        })

    }
    onNoConfirm(){
        this.props.form.validateFields((err,values)=>{
            if (!err){
                confirm({
                    title: '存在问题？',
                    content: '请把问题详情写在备注中方便我们处理！',
                    onOk:()=>{
                        console.info(values);
                        this.props.confirmSchedule({confirm: false, remark: values.schedule.remark});
                        this.setState({confirmDisabled: true, })
                    },
                    onCancel(){},
                })
            }
        });


    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const { confirmDisabled } = this.state;
        const { loading, scheduleData, confirm } = this.props;



        return (
            <div>

                <div className={style.schedule}>
                    <h1>个人课表</h1>
                    <Spin spinning={loading} tip="正在读取数据">
                        <Table
                            rowKey={record=>record.id}
                            pagination={false}
                            bordered columns={this.columns}
                            dataSource={scheduleData}
                        />
                    </Spin>

                </div>
                {
                    confirm ?
                        ''
                        :
                        <div className={style.confirmBox}>
                            <Row>
                                <Col>
                                    <FormItem label="备注" labelCol={{span: 5}} wrapperCol={{span: 16}}>
                                        {getFieldDecorator('schedule.remark',{
                                            initialValue: '',
                                            rules: [{required: true, message: '请填写问题描述!'}]
                                        })(
                                            <Input type="textarea" rows={4} disabled={confirmDisabled}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={8} span={4}>
                                    <Button type="primary" onClick={::this.onConfirm} disabled={confirmDisabled}>没问题，确认</Button>
                                </Col>
                                <Col span={4}>
                                    <Button onClick={::this.onNoConfirm} disabled={confirmDisabled}>存在问题并提交</Button>
                                </Col>
                            </Row>
                        </div>
                }

            </div>
        )
    }
}

const ScheduleForm = Form.create()(Schedule);

export default connect(state=>{
    return {
        ...state.reducers.schedule
    }
}, dispatch => bindActionCreators({ getPersonalSchedule, confirmSchedule },dispatch))(ScheduleForm)