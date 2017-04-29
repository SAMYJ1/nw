import React, { Component } from 'react';
import { Input, Icon, TimePicker  } from 'antd';
import style from './editable.less';
import moment from 'moment';


export default class InputEditableCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            editable: false,
        };
        this.format = 'HH:mm';
    }

    componentDidMount(){
        if (this.props.value){
            let value = this.props.value;
            this.setState({ value })
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props.value !== nextProps.value){
            let value = nextProps.value;
            this.setState({value})
        }
    }


    check(){
        this.setState({editable: false});
        if (this.props.onChange){
            this.props.onChange(this.state.value)
        }
    }
    edit(){
        this.setState({editable: true})
    }

    onStartTimeChange(time, timeString){
        let value = this.state.value;
        let newTime = value.split('-');
        newTime.splice(0,1,timeString);
        console.log(value,newTime.join('-'));
        this.setState({value: newTime.join('-')})
    }
    onEndTimeChange(time, timeString){
        let value = this.state.value;
        let newTime = value.split('-');
        newTime.splice(1,1,timeString);
        console.log(value,newTime.join('-'));
        this.setState({value: newTime.join('-')})
    }

    render(){
        let { editable, value } = this.state;

        let startTime = value.split('-')[0];
        let endTime = value.split('-')[1];


        return (
            <div className={style.editableCell}>
                {
                    editable ?
                        <div className={style.editableCellInputWrapper}>

                            <TimePicker format={this.format} value={moment(startTime, this.format)} onChange={::this.onStartTimeChange} />
                            <TimePicker format={this.format} value={moment(endTime, this.format)} onChange={::this.onEndTimeChange} />

                            <Icon type="check" className={style.editableCellIconCheck} onClick={this.check.bind(this)}/>
                        </div>
                        :
                        <div className={style.editableCellTextWrapper}>
                            {value || ''}
                            <Icon type="edit" className={style.editableCellIcon} onClick={this.edit.bind(this)}/>
                        </div>
                }
            </div>
        )
    }
}