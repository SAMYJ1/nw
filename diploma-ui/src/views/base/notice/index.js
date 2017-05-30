import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal,Input,Table, Spin } from 'antd';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { getNoticeList, addNotice, deleteNotice } from '../../../reducers/notice';
import { buttons, accountColumns } from './notice.config';



class Notice extends Component{
    constructor(props){
        super(props);
        this.state={
            showNoticeModal: false,
            justNoticeModal: false,
            selectedRowKeys: [],
            selectedRows: [],
            title: '',
            context: '',
            textValue: '',
            noticeTitleText: '',
        };
        this.buttons = JSON.parse(JSON.stringify(buttons));
        this.columns = JSON.parse(JSON.stringify(accountColumns));
    }
    componentWillMount(){
        this.getNewColumn();
    }
    componentDidMount(){
        this.onSearch();
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.reload && nextProps.reload){
            this.onSearch();
        }
    }

    onClickButton(e) {

        let action = e.action;

        switch (action) {

            case 'add':
                this.onAdd();
                break;
            case 'delete':
                this.onDelete();
                break;

        }
    }
    getButtonStatus() {

        let {selectedRows} = this.state;

        let {buttons} = this;

        let len = selectedRows.length;


        return buttons.map(function (button) {

            let {action} = button;

            switch (action) {

                case 'delete':

                    button.disabled = (len !== 1);

                    break;

            }
            return button;
        });
    }

    getNewColumn() {

        this.columns.find((item) => {

            if (item.dataIndex === 'title') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }


        })
    }

    onSearch(){
        this.props.getNoticeList({});
    }
    onAdd(){
        this.setState({showNoticeModal: true, });
    }
    onDelete(){
        let { selectedRowKeys } = this.state;
        console.log(selectedRowKeys);
        this.props.deleteNotice({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys:[], selectedRows:[]})
    }
    onLookDetail(record){
        let {title, context } = record;

        this.setState({justNoticeModal: true, title, context})
    }

    onChangeNoticeTitle(e){
        this.setState({noticeTitleText: e.target.value})
    }
    onChangeNotice(e){
        this.setState({textValue: e.target.value})
    }

    onSaveNotice(){
        const {noticeTitleText, textValue} = this.state;

        this.props.addNotice({title: noticeTitleText, context: textValue});

        this.setState({showNoticeModal: false, textValue: '', noticeTitleText: '' })
    }
    onCancel(){

        this.setState({showNoticeModal: false, textValue: '', noticeTitleText: ''})
    }


    render(){
        const { selectedRowKeys, showNoticeModal, textValue, context, title, justNoticeModal } = this.state;
        const { loading, noticeList } = this.props;

        const columns = this.columns;
        const buttons = this.getButtonStatus();

        console.log()

        let total = noticeList.length;
        const pagination = {
            size: 'middle',
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            current:this.state.currentPage,
            showTotal: () => `共 ${total} 条`,
            onChange: (current) => {
                this.setState({currentPage: current})
            }
        };
        const rowSelection = {

            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {

                this.setState({ selectedRows, selectedRowKeys });
            }
        };
        return (
            <div style={{width: '80%', margin: '0 auto'}}>
                <div className="controlWrapper wrapper">
                    <Row>
                        <Col className="buttonWrapper">
                            <ButtonGroup dataProvider={ buttons } onClick={ ::this.onClickButton }/>
                        </Col>
                    </Row>
                </div>

                <Modal
                    visible={showNoticeModal}
                    width={450}
                    title="公告信息"
                    maskClosable={false}
                    onOk={ ::this.onSaveNotice}
                    onCancel={::this.onCancel }
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <Row>
                        <Col>
                            <h3>标题</h3>
                            <Input onChange={::this.onChangeNoticeTitle} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>公告</h3>
                            <Input type="textarea" onChange={::this.onChangeNotice } value={textValue}  autosize={{minRows: 6,}}/>
                        </Col>
                    </Row>


                </Modal>
                <Modal
                    title={title}
                    visible={justNoticeModal}
                    width={400}
                    onCancel={()=>{this.setState({justNoticeModal: false})}}
                    footer={null}

                >
                    <div style={{minHeight:300, width: '80%', margin: '20px auto'}}>
                        <pre>
                            {context}
                        </pre>
                    </div>

                </Modal>

                <Spin spinning={loading} tip="正在读取数据...">
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={noticeList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}


export default connect(state=>{
    return {
        ...state.reducers.notice
    }
},(dispatch)=>(bindActionCreators({ getNoticeList, addNotice, deleteNotice  }, dispatch))
)(Notice)