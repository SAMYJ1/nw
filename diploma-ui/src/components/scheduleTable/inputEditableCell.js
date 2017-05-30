import React, { Component, PropTypes} from 'react';
import {  Input, Icon, } from 'antd';
import style from './editable.less';

export default class InputEditableCell extends Component {
    static PropTypes = {
        showDeleteButton: PropTypes.bool,
        handleDelete: PropTypes.func,
    };

    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit = () => {
        this.setState({ editable: true });
    };
    deleteItem = () => {
        if (this.props.handleDelete){
            this.props.handleDelete()
        }
    };
    render() {
        const { value, editable } = this.state;
        const {showDeleteButton} = this.props;
        return (
            <div className={style.editableCell}>
                {
                    editable ?
                        <div className={style.editableCellInputWrapper}>
                            <Input
                                {...this.props}
                                style={{width: '100%'}}
                                value={value}
                                onChange={this.handleChange}

                            />
                            <Icon
                                type="check"
                                className={style.editableCellIconCheck}
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className={style.editableCellTextWrapper}>
                            {<pre>{value}</pre> || ' '}
                            <Icon
                                type="edit"
                                className={style.editableCellIcon}
                                onClick={this.edit}
                            />
                            {
                                showDeleteButton ?
                                    <Icon
                                    type="delete"
                                    style={{right: '20px'}}
                                    className={style.editableCellIcon}
                                    onClick={this.deleteItem}
                                />
                                    :
                                    ''

                            }

                        </div>
                }
            </div>
        );
    }
}