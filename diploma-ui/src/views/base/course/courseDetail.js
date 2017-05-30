import React , {Component,PropTypes} from 'react';
import { Spin, Row, Col, Table, Button, Input, Icon} from 'antd';
import {v1 as uuidV1} from 'uuid';
import { detailColumns } from './courseDetail.config';
import InputEditableCell from '../../../components/scheduleTable/inputEditableCell';
import style from './index.less';
import './style.less';

export default class CourseDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: JSON.parse(JSON.stringify(detailColumns)),
            dataSource: [],
            header: [],
        };
        this.columns = JSON.parse(JSON.stringify(detailColumns));
    }
    static PropTypes = {
        dataSource: PropTypes.array.isRequired,
        tableTitle: PropTypes.array.isRequired,
    };

    componentWillMount(){
        this.getInitColumn(this.props.tableTitle);

        let dataSource = this.props.dataSource.length === 0 ? [{id: uuidV1(),courseType:''}]: this.props.dataSource;
        this.setState({dataSource})
    }
    componentDidUpdate(prevProps, prevState){
        if (this.state.columns.length !== prevState.columns.length){
            this.getNewColumn();
        }

    }
    componentWillReceiveProps(nextProps){
        if (this.props.dataSource !== nextProps.dataSource){
            let dataSource = nextProps.dataSource.length === 0 ? [{id: uuidV1(),courseType:''}]: nextProps.dataSource;
            this.setState({dataSource})
        }
        if (this.props.tableTitle !== nextProps.tableTitle){
            this.getInitColumn(nextProps.tableTitle);
        }
    }


    getInitColumn(column){
        let backColumn = JSON.parse(JSON.stringify(column))
        let {columns} = this.state;



        for (let item of backColumn){
            let idx = columns.findIndex(i => i.dataIndex === item.dataIndex);
            if (idx === -1){
                columns.push(item)
            }
        }

        this.getNewColumn(columns);
        this.getHeader(columns)

    }
    getHeader(columns){
        let newColumn = JSON.parse(JSON.stringify(columns));
        let idx = newColumn.findIndex(item=>item.dataIndex === 'courseType');
        newColumn.splice(idx,1);
        newColumn.forEach((item, index)=>{
            if (item.render){
                delete item.render
            }
            if (typeof item.title === 'object'){
                console.log('11111',item.title, typeof item.title === 'object')
                let title = item.title.props.value;
                delete item.title;
                item.title = title
            }
        });
        this.setState({header: newColumn})
        console.log('header : ',newColumn)
    }

    getNewColumn(columns = this.state.columns) {

        columns.find((item) => {

            if (item.dataIndex === 'courseType') {
                item.render = (text, record, index) => {
                    return (
                        <div className={style.editableCell}>
                            {
                                this.state.dataSource.length>1 ?
                                    <Icon type="delete" className={style.editableCellIcon} onClick={ this.onDeleteRow.bind(this, index) }/>
                                    :
                                    ''
                            }
                            <InputEditableCell value={text} onChange={ this.onCellChange(index, item.dataIndex) }/>
                        </div>
                    )
                }
            } else {
                item.render = (text, record, index) => {
                    return (
                        <InputEditableCell autosize={{ minRows: 2, }} type="textarea" value={text} onChange={ this.onCellChange(index, item.dataIndex) }/>
                    );
                };
                if (typeof item.title === 'string'){
                    item.title = <InputEditableCell value={item.title} showDeleteButton={true} handleDelete={ this.deleteCol.bind(this, item.dataIndex)} onChange={this.onColCellChange(item.dataIndex)}/>
                }
            }
        });
        this.setState({columns})
    }

    addRow(){
        let dataSource = JSON.parse(JSON.stringify(this.state.dataSource));

        let data =JSON.parse(JSON.stringify(dataSource[0]));
        delete data.id;
        let newRowData = {id: uuidV1()};
        Object.keys(data).forEach(item=>{
            newRowData[item] = ''
        });
        dataSource.push(newRowData);
        this.setState({dataSource})
    }
    onDeleteRow(idx){
        const {dataSource} = this.state;
        dataSource.splice(idx, 1);
        this.setState({dataSource})
    }

    addCol(){
        let { columns, } = this.state;

        let rowIdx = columns.length < 2  ? 1 : Number(columns[columns.length - 1].dataIndex.slice(3)) + 1;
        let columnData = {
            title: <InputEditableCell value={''} showDeleteButton={true} handleDelete={ this.deleteCol.bind(this, 'col' + rowIdx)} onChange={ this.onColCellChange('col' + rowIdx) }/>,
            dataIndex: 'col' + rowIdx,
        };
        let newColumns = [...columns, columnData];
        this.getHeader(newColumns);
        this.setState({columns: newColumns});

    }
    deleteCol(dataIdx){
        console.log(dataIdx);
        let { columns, dataSource } = this.state;
        let delIdx = columns.findIndex(item=>item.dataIndex === dataIdx);
        columns.splice(delIdx, 1);
        dataSource.forEach(item => {
            delete item[dataIdx]
        });
        this.getHeader(columns);
        this.setState({columns, dataSource })
    }

    onColCellChange(dataIdx){
        return (value) => {
            console.info(dataIdx,value)
            let header = [...this.state.header];
            header.forEach(item=> {
                if (item.dataIndex === dataIdx){
                    item.title = value;
                }
            });
            this.setState({ header })
        }
    }
    onCellChange(index, key){
        return (value)=>{
            console.log(index, key , value);
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({dataSource});
        }
    }

    backupData(){
        const { header, dataSource, columns} = this.state;
        return { header, dataSource , columns}

    }
    resetData(){
        this.setState({
            columns: JSON.parse(JSON.stringify(detailColumns)),
            dataSource: [],
            header: [],
        })
    }

    render(){
        const { dataSource, columns } = this.state;

        return (
            <div>
                <div style={{marginBottom: '10px'}}>
                    <Row>
                        <Col offset={16} span={4}>
                            <Button onClick={ ::this.addRow }>增加行</Button>
                        </Col>
                        <Col span={4}>
                            <Button onClick={ ::this.addCol }>增加列</Button>
                        </Col>
                    </Row>
                </div>
                <Table
                    className={style.courseDetailTable}
                    rowKey='id'
                    pagination={false}
                    bordered columns={columns}
                    dataSource={dataSource}
                />
            </div>
        )
    }
}