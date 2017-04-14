import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from  './index.less';
import { Icon, Modal, Spin, Form, Input} from 'antd';
import HeadMenu from './HeadMenu';
import TabContent from './TabContent';
import { getMenu,addTab } from '../../reducers/config';
import { logout, sendPassword, } from '../../reducers/user';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6},
    wrapperCol: { span: 12}
};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPasswordModal: false,
        };

        /*const user = this.props.user;
         if (!user.id) {
         this.props.history.push('/login');
         }*/
    }

    componentWillMount() {
        this.props.getMenu();
    }

    onMenuClick(e){
        const {menuData} = this.props;
        let {key} = e;
        let title = "";

        menuData.find(function(item){
            let url = item.url;
            if(key === url) {
                title = item.name;
                return true;
            }

            return false;
        });

        let action = {
            url:key,
            title,
            key
        }
        this.props.addTab(action);
    }

    showResetPasswordModal() {
        this.setState({ showPasswordModal: true });
    }

    submitPassword() {
        let next = false;
        let resetPasswordRibbon = this.props.form;
        resetPasswordRibbon.validateFields((errors, value) => {
            if (!!!errors) {
                next = true;
            }
        });
        if(next) {
            let data = resetPasswordRibbon.getFieldsValue();
            this.props.sendPassword(data);
            resetPasswordRibbon.resetFields();
            this.setState({ showPasswordModal: false });
        }
    }

    hideResetPasswordModal() {
        let resetPasswordRibbon = this.props.form;
        resetPasswordRibbon.resetFields();
        this.setState({ showPasswordModal: false });
    }

    checkPass(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    doLogout(){
        this.props.logout();
    }

    render() {

        const { company='tangu', userName='001', loadingPasswordRibbon=false, menuData=[], activeTabKey=[] } = this.props;

        const { showPasswordModal } = this.state;

        const { getFieldDecorator } = this.props.form;

        const oldPasswdProps = getFieldDecorator('oldPassword', {
            initialValue: '',
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
            ],
        });

        const passwdProps = getFieldDecorator('password', {
            initialValue: '',
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
            ],
        });

        const rePasswdProps = getFieldDecorator('rePassword', {
            initialValue: '',
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass.bind(this),
            }],
        });

        return (
            <div className={styles.normal}>
                <div className={styles.head}>
                    <h1>药房管家系统</h1>
                    <ul className={styles.sidebarUser}>
                        <li><a href="javascript:;"><Icon type="user" className={styles.headIcon}/> {company}</a> </li>
                        <li><a href="javascript:;">{userName}</a></li>
                        <li><a href="javascript:;" onClick={ this.showResetPasswordModal.bind(this)}><Icon type="unlock" className={styles.headIcon} />修改密码</a></li>
                        <li><a href="javascript:;" onClick={this.doLogout.bind(this)}><Icon type="logout" className={styles.headIcon}/>退  出</a></li>
                    </ul>
                </div>

                <div>
                    <HeadMenu dataProvider={menuData} selectedKeys={[activeTabKey]} onMenuClick={this.onMenuClick.bind(this)}  />
                </div>

                <div className={styles.content} >
                    <TabContent />
                </div>

                <Modal title="修改密码" visible={ showPasswordModal } onOk={ this.submitPassword.bind(this) } onCancel={ this.hideResetPasswordModal.bind(this)}>
                    <Spin spinning={ loadingPasswordRibbon }>
                        <Form horizontal form={this.props.form}>
                            <FormItem
                                {...formItemLayout}
                                label="原密码"
                            >
                                {oldPasswdProps(
                                    <Input type="password" autoComplete="off" onContextMenu={false} onPaste={false} onCopy={false} onCut={false}/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="新密码"
                            >
                                {passwdProps(
                                    <Input type="password" autoComplete="off" onContextMenu={false} onPaste={false} onCopy={false} onCut={false}/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="确认密码"
                            >
                                {rePasswdProps(
                                    <Input type="password" autoComplete="off" placeholder="两次输入密码保持一致" onContextMenu={false} onPaste={false} onCopy={false} onCut={false}/>
                                )}
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>

                <div className={styles.foot}>
                    技术支持：<a href="http://www.tangusoft.com" target="_blank">杭州唐古信息科技有限公司</a>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
};

App.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

App = Form.create()(App);

export default connect(state => {

        return {
            userName: state.reducers.user.userName,
            menuData: state.reducers.config.menuData,
            activeTabKey: state.reducers.config.activeTabKey,
            loadingPasswordRibbon: state.reducers.user.loadingPasswordRibbon
        }
    },
    (dispatch) => (bindActionCreators({logout, sendPassword, getMenu, addTab}, dispatch))
)(App);