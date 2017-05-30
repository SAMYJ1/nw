import React, { Component } from 'react';
import { Input, Icon, TimePicker  } from 'antd';
import style from './editable.less';
import moment from 'moment';


export default class TimeEditableCell extends Component{
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

        let startTime = value ? value.split('-')[0]: null;
        let endTime = value ? value.split('-')[1]: null;
        console.log('2222222222222222222222222',moment(null,this.format))


        return (
            <div className={style.editableCell}>
                {
                    editable ?
                        <div className={style.editableCellInputWrapper}>

                            <TimePicker format={this.format} value={startTime?moment(startTime, this.format):null} onChange={::this.onStartTimeChange} />
                            <TimePicker format={this.format} value={endTime?moment(endTime, this.format):null} onChange={::this.onEndTimeChange} />

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