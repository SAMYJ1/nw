import React , {Component,PropTypes} from 'react';
import { Spin, Table, Button, Input} from 'antd';
import { columns } from './courseDetail.config';
import InputEditableCell from '../../../components/scheduleTable/inputEditableCell';


export default class CourseDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: JSON.parse(JSON.stringify(columns)),
        };
        this.columns = JSON.parse(JSON.stringify(columns));
    }
    static PropTypes = {

    };

    componentWillMount(){
        this.getNewColumn();
    }
    componentWillUpdate(nextProps, nextState){
        if (this.state.columns.length !== nextState.columns.length){
            this.getNewColumn();
        }
    }

    getNewColumn() {

        this.state.columns.find((item) => {

            if (item.dataIndex === 'courseType') {
                item.render = (text, record) => <Input value={text}/>
            } else {
                item.render = (text, record) => {
                    return (
                        <Input type='textarea' rows={3} style={{width: 100}} value={text}/>
                    );
                }
            }


        })
    }

    addRow(){

    }
    addCol(){
        let { columns, } = this.state;

        let rowIdx = columns.length < 2  ? 1 : Number(columns[columns.length - 1].dataIndex.slice(3)) + 1;
        let columnData = {
            title: <InputEditableCell value={''} onChange={ this.onColCellChange('col' + rowIdx) }/>,
            dataIndex: 'col' + rowIdx,
        };
        columns.push(columnData);
        this.setState({columns});


    }

    onColCellChange(dataIdx){
        return (value) => {
            console.info(dataIdx,value)

        }
    }

    render(){
        let dataSource = [];

        return (
            <div>
                <div>
                    <Button onClick={ ::this.addRow }>增加行</Button>
                    <Button onClick={ ::this.addCol }>增加列</Button>
                </div>
                <Table
                    rowKey={record => record.id}
                    pagination={false}
                    bordered columns={this.state.columns}
                    dataSource={dataSource}
                />
            </div>
        )
    }
}