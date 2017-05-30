import React , {Component,PropTypes} from 'react';
import { Spin, Row, Col, Table, Button, Input, Icon} from 'antd';
import { detailColumns } from '../course/courseDetail.config';


export default class CourseInfoDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: JSON.parse(JSON.stringify(detailColumns)),
            dataSource: [],
        };

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
        let backColumn = JSON.parse(JSON.stringify(column));
        let {columns} = this.state;


        for (let item of backColumn){
            let idx = columns.findIndex(i => i.dataIndex === item.dataIndex);
            if (idx === -1){
                columns.push(item)
            }
        }

        this.getNewColumn(columns);

    }

    getNewColumn(columns = this.state.columns) {

        columns.find((item) => {

            if (item.dataIndex === 'courseType') {
                item.render = (text, record, index) => {
                    return (
                        <pre>{text}</pre>
                    )
                }
            } else {
                item.render = (text, record, index) => {
                    return (
                        <pre>{text}</pre>
                    );
                };
            }
        });
        this.setState({columns})
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
                <Table
                    rowKey={record => record.id}
                    pagination={false}
                    bordered columns={columns}
                    dataSource={dataSource}
                />
            </div>
        )
    }
}