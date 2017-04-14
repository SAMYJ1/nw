import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

export class ButtonGroup extends Component{
    constructor(props) {
        super(props);
    }

    onClick(e){
        console.log('ButtonGroup onClick e = ',e);
        if(this.props.onClick){
            this.props.onClick(e);
        }
    }

    render() {
        let dataProvider = this.props.dataProvider;
        let that = this;
        let buttons = dataProvider.map(function(data,index){
            let {label, ...rest} = data;
            return (
                <Button {...rest} key={index} onClick={that.onClick.bind(that,rest)} >{label}</Button>
            )
        });
        return (
            <div>
                {buttons}
            </div>
        );
    }
}