import React, { Component } from 'react';
import { Input, Icon, } from 'antd';
import style from './editable.less';


export default class InputEditableCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }

    handleChange(e){
        let value = e.target.value;
        this.setState({ value })
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


    render(){
        let { editable, value } = this.state;


        return (
            <div className={style.editableCell}>
                {
                    editable ?
                        <div className={style.editableCellInputWrapper}>
                            <Input
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            onPressEnter={this.check.bind(this)}
                            />
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