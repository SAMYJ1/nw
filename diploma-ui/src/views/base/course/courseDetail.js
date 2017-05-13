import React , {Component,PropTypes} from 'react';
import { Spin, Row, Col, Table, Button, Input, Icon} from 'antd';
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

        this.setState({dataSource: this.props.dataSource})
    }
    componentDidUpdate(prevProps, prevState){
        if (this.state.columns.length !== prevState.columns.length){
            this.getNewColumn();
        }

    }
    componentWillReceiveProps(nextProps){
        if (this.props.dataSource !== nextProps.dataSource){
            this.setState({dataSource: nextProps.dataSource})
        }
        if (this.props.tableTitle !== nextProps.tableTitle){
            this.getInitColumn(nextProps.tableTitle);
        }
    }


    getInitColumn(column){


        let columns = [...this.state.columns, ...column];

        this.getNewColumn(columns);
        let newColumn = JSON.parse(JSON.stringify(column));
        newColumn.forEach(item=>{
            if (item.render){
                delete item.render
            }
        });
        this.setState({header: newColumn })

    }

    getNewColumn(columns = this.state.columns) {

        columns.find((item) => {

            if (item.dataIndex === 'courseType') {
                item.render = (text, record, index) => {
                    return (
                        <div className={style.editableCell}>
                            <Icon type="delete" className={style.editableCellIcon} onClick={ this.onDeleteRow.bind(this, index) }/>
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
                item.title = <InputEditableCell value={item.title} showDeleteButton={true} handleDelete={ this.deleteCol.bind(this, item.dataIndex)} onChange={this.onColCellChange(item.dataIndex)}/>
            }
        });
        this.setState({columns})
    }

    addRow(){
        let dataSource = JSON.parse(JSON.stringify(this.state.dataSource));
        let id = new Date();
        let data =dataSource[0];
        delete data.id;
        let newRowData = {id: id.toString()};
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
        this.setState({columns: newColumns});

    }
    deleteCol(dataIdx){
        console.log(dataIdx);
        let { columns } = this.state;
        let delIdx = columns.findIndex(item=>item.dataIndex === dataIdx);
        columns.splice(delIdx, 1);
        this.setState(columns)
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
        const { header, dataSource} = this.state;
        return { header, dataSource }

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
                    rowKey={record => record.id}
                    pagination={false}
                    bordered columns={columns}
                    dataSource={dataSource}
                />
            </div>
        )
    }
}