import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'antd';
import {  } from '../../../reducers/guide';

class Guide extends Component{
    constructor(props){
        super(props);

        this.state={

        };

    }

    render() {

        return (
            <div>

            </div>
        )
    }


}

export default connect((state)=>{
    return {
        ...state.reducers.guide
    }
},(dispatch)=>(bindActionCreators({  },dispatch)))(Guide)