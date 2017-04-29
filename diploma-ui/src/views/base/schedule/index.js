import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Row, Col, Table, Modal, Spin, Form } from 'antd';
import { getPersonalSchedule, } from '../../../reducers/schedule';
import { scheduleColumns } from './schedule.config';

const FormItem = Form.Item;

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {

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




    render(){
        const { } = this.state;
        const { loading, scheduleData } = this.props;


        return (
            <div>

                <div>
                    <Spin spinning={loading} tip="正在读取数据">
                        <Table
                            rowKey={record=>record.id}
                            pagination={false}
                            bordered columns={this.columns}
                            dataSource={scheduleData}
                        />
                    </Spin>

                </div>
            </div>
        )
    }
}

export default connect(state=>{
    return {
        ...state.reducers.schedule
    }
}, dispatch => bindActionCreators({ getPersonalSchedule },dispatch))(Schedule)