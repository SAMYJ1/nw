import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';

import MulSelEditableCell from './MulSelEditableCell';
import TimeEditableCell from './timeEditableCell';


export default class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        };
        this.columns = [
            {
                title: '周一',
                dataIndex: 'monday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'monday')}
                    />
                ),
            },
            {
                title: '周二',
                dataIndex: 'tuesday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'tuesday')}
                    />
                ),
            },
            {
                title: '周三',
                dataIndex: 'wednesday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'wednesday')}
                    />
                ),
            },
            {
                title: '周四',
                dataIndex: 'thursday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'thursday')}
                    />
                ),
            },
            {
                title: '周五',
                dataIndex: 'friday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'friday')}
                    />
                ),
            },
            {
                title: '周六',
                dataIndex: 'saturday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'saturday')}
                    />
                ),
            },
            {
                title: '周日',
                dataIndex: 'sunday',
                render: (text, record, index) => (
                    <MulSelEditableCell
                        value={text}
                        record={record}
                        onChange={this.onCellChange(index, 'sunday')}
                    />
                ),
            },
            {
                title: '时间',
                dataIndex: 'time',
                // fixed: 'right',
                width: 100,
                render: (text, record, index)=>(
                    <TimeEditableCell
                        value={text}
                        onChange={this.onCellChange(index, 'time')}/>
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
                render: (text, record, index) => {
                    return (
                        this.state.dataSource.length > 1 ?
                            (
                                <Popconfirm title="确认删除吗?" onConfirm={() => this.onDelete(index)}>
                                    <a href="#">删除</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }

        ];
        this.initData = {
            id: 0,
            monday: {
                course: '',
                students: [],
                address: '',
            },
            tuesday: {
                course: '',
                students: [],
                address: '',
            },
            wednesday: {
                course: '',
                students: [],
                address: '',
            },
            thursday: {
                course: '',
                students: [],
                address: '',
            },
            friday: {
                course: '',
                students: [],
                address: '',
            },
            saturday: {
                course: '',
                students: [],
                address: '',
            },
            sunday: {
                course: '',
                students: [],
                address: '',
            },
            time: '-'
        };
    }


    componentWillMount(){
        console.log('will mount:: ', this.props);
        let initialData = JSON.parse(JSON.stringify(this.initData));
        if (this.props.dataSource && this.props.studentList ){
            let data = JSON.parse(JSON.stringify(this.props.dataSource));
            let dataSource =  !data.schedule||data.schedule.length<1 ? [initialData] : data.schedule;
            let courseList = data.courseList;
            let studentList = this.props.studentList;

            dataSource.forEach(item=>{item.studentList = studentList;item.courseList = courseList});

            console.info("scheduleTable will Mount ! ", dataSource)
            this.setState({ dataSource, })
        }


    }

    componentWillReceiveProps(nextProps){
        let initialData = JSON.parse(JSON.stringify(this.initData));

        if (this.props.dataSource !==nextProps.dataSource ){
            let data = JSON.parse(JSON.stringify(nextProps.dataSource));
            let dataSource =  !data.schedule||data.schedule.length<1 ? [initialData] : data.schedule;
            let courseList = data.courseList;
            let studentList = this.props.studentList;
            dataSource.forEach(item=>{item.studentList = studentList;item.courseList = courseList});

            this.setState({ dataSource, })
        }
        if (this.props.studentList !== nextProps.studentList){

        }

    }

    handleAdd(){
        let { dataSource } = this.state;
        let id  = dataSource[dataSource.length - 1].id;
        let data = JSON.parse(JSON.stringify(this.initData));
        data.id = id + 1;
        data.studentList = this.props.studentList;
        data.courseList = dataSource[0].courseList;
        dataSource.push({ ...data });
        this.setState({ dataSource });
    }

    onDelete(index){
        let { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({ dataSource })
    }

    onCellChange(index,key){
        return (value)=>{
            console.log(value);
            let dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        }
    }

    backupData(){
        let { dataSource } = this.state;
        return { dataSource };
    }

    render() {
        let { dataSource } = this.state;

        return (
            <div>
                <Button onClick={ ::this.handleAdd }>增加行</Button>
                <Table
                rowKey={record=>record.id}
                pagination={false}
                bordered columns={this.columns}
                dataSource={dataSource}
                />
            </div>
        )
    }
}

