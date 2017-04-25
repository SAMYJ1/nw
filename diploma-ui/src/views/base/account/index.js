import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Select, Modal,Input,Table, Form, Spin } from 'antd';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { getAccountList, modifyAccount, deleteAccount } from '../../../reducers/account';
import { buttons, accountColumns } from './account.config';

const FormItem = Form.Item;
const Option = Select.Option;


class Account extends Component{
    constructor(props){
        super(props);
        this.state={
            showAccountModal: false,
            selectedRowKeys: [],
            selectedRows: [],
            record: {},
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

            case 'search':
                this.onSearch();
                break;

            case 'add':
                this.onAdd();
                break;
            case 'reset':
                this.onReset();
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

            if (item.dataIndex === 'accountCode') {

                item.render = (text, record) => {
                    return (<a onClick={this.onLookDetail.bind(this, record)}>{text}</a>);
                }
            }


        })
    }

    onSearch(){
        let searchData = this.props.form.getFieldsValue(['search.accountCode']);
        this.props.getAccountList(searchData);
    }
    onAdd(){
        this.setState({showAccountModal: true});
    }
    onReset(){
        this.props.form.resetFields(['search.accountCode']);
    }
    onDelete(){
        let { selectedRowKeys } = this.state;
        console.log(selectedRowKeys);
        this.props.deleteAccount({id: selectedRowKeys[0]});
        this.setState({selectedRowKeys:[], selectedRows:[]})
    }
    onLookDetail(record){
        this.props.form.setFieldsValue({account:{...record}});
        this.setState({showAccountModal: true, record})
    }

    onSaveAccount(){
        let { record } = this.state;
        let data = this.props.form.getFieldsValue(['account']);
        console.log(data)
        let newData = record.id ? {...data.account, id: record.id} : {...data.account};
        this.props.modifyAccount(newData);

        this.props.form.resetFields(['account.accountCode','account.accountName','account.role','account.remark']);
        this.setState({showAccountModal: false, record:{}});
    }
    onCancel(){
        this.props.form.resetFields(['account.accountCode','account.accountName','account.role','account.remark']);
        this.setState({showAccountModal: false, record: {}})
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const { selectedRows,selectedRowKeys, showAccountModal } = this.state;
        const { loading, accountList } = this.props;

        const columns = this.columns;
        const buttons = this.getButtonStatus();

        const roleSelection = [{value: '0', label: '学生'},{value: '1', label: '教师'}, {value: '2', label: '管理员'}];
        let roleOptions = roleSelection.map(item => <Option key={item.value}>{item.label}</Option>);

        let total = accountList.length;
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
            <div>
                <div className="controlWrapper wrapper">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="账号"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}
                            >
                                {getFieldDecorator('search.accountCode', {
                                    initialValue: ''
                                })(
                                    <Input placeholder="请输入账号搜索" />
                                )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="buttonWrapper">
                            <ButtonGroup dataProvider={ buttons } onClick={ ::this.onClickButton }/>
                        </Col>
                    </Row>
                </div>

                <Modal
                    visible={showAccountModal}
                    width={450}
                    title="账号信息"
                    maskClosable={false}
                    onOk={ ::this.onSaveAccount}
                    onCancel={::this.onCancel }
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <Row>
                        <Col>
                            <FormItem label="姓名" labelCol={{span: 6}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('account.accountName',{
                                    rules: [{ required: true, message: '请输入姓名' }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="账号" labelCol={{span: 6}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('account.accountCode',{
                                    rules: [{ required: true, message: '请输入账号' }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="角色" labelCol={{span: 6}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('account.role',{
                                    rules: [{required: true, message: '请选择角色'}],
                                })(
                                    <Select style={{width: '100%'}}>
                                        {roleOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="备注" labelCol={{span: 4}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('account.remark',{})(
                                    <Input type="textarea" rows={3}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>

                <Spin spinning={loading} tip="正在读取数据...">
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        pagination={ pagination }
                        dataSource={accountList}
                        bordered
                        columns={ columns }
                    />
                </Spin>
            </div>
        )
    }
}

const AccountForm = Form.create()(Account);

export default connect(state=>{
    return {
        ...state.reducers.account
    }
},(dispatch)=>(bindActionCreators({ getAccountList, modifyAccount, deleteAccount  }, dispatch))
)(AccountForm)