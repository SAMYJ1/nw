import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Row, Col, Table, Modal, Spin, Form } from 'antd';
import { getPersonalSchedule, } from '../../../reducers/schedule';

const FormItem = Form.Item;

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        const { } = this.state;
        const { } = this.props;


        return (
            <div>

            </div>
        )
    }
}

export default connect(state=>{
    return {
        ...state.reducers.schedule
    }
}, dispatch => bindActionCreators({ getPersonalSchedule },dispatch))(Schedule)