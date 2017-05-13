import React, { PropTypes } from 'react'
import { Form, Input, Button, Row, Col, notification,Icon, Radio } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login,  } from '../../reducers/user'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import styles from './index.less';

const propTypes = {
    user: PropTypes.object,
    handleLogin: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.userCode = localStorage.getItem("userCode");
    }

    // componentWillMount(){
    //   this.props.resetInitialState()
    // }
    componentWillReceiveProps(nextProps) {
        const user = nextProps.user;

        if (user.id) {
            this.context.router.replace('/home');
        }
        if (!this.props.user.modalFlag && user.modalFlag){
            if (this.props.handleLogin){
                this.props.handleLogin()
            }
        }
    }

    componentDidMount() {

        this.setCache();
    }

    setCache() {

        let {  userCode } = this;

        this.props.form.setFieldsValue({  userCode })
    }

    resetAll(){
        this.props.form.resetFields();
    }

    handleSubmit (e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.login(data);
        localStorage.clear();
        localStorage.setItem("userCode",data.userCode);

    }


    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.login}>
                <div className={styles.loginHead}>
                    <span>用户登录</span>
                </div>
                <div className={styles.loginForm}>
                    <Form onSubmit={this.handleSubmit.bind(this)} >
                        <FormItem
                            className={styles.word}
                            wrapperCol={{ span: 24 }}
                        >
                            {
                                getFieldDecorator('userCode',{
                                    initialValue: ""
                                })(
                                    <Input className={styles.input}  prefix={<Icon type="user" />} placeholder='用户' />
                                )
                            }
                        </FormItem>
                        <FormItem
                            className={styles.word}
                            wrapperCol={{ span: 24 }}
                        >
                            {
                                getFieldDecorator('password')
                                (
                                    <Input className={styles.input} type='password' prefix={<Icon type="lock" />} placeholder='密码' />
                                )
                            }
                        </FormItem>
                        <FormItem
                            className={styles.word}
                            wrapperCol={{ span: 24 }}
                        >
                            {
                                getFieldDecorator('roleName',{initialValue: 0})
                                (
                                    <RadioGroup>
                                        <Radio key="1" value={0}>学生</Radio>
                                        <Radio key="2" value={1}>教师</Radio>
                                        <Radio key="3" value={2}>管理员</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <Row>
                            <Col span={6} offset={3}>
                                <Button  className={styles.bt} style={{}} loading={this.props.user.loadingLogin} htmlType='submit'>登录</Button>
                            </Col>
                            <Col span={6} offset={3}>
                                <Button className={styles.bt} onClick={this.resetAll.bind(this)}>重置</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        )
    }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

Login = Form.create()(Login);


export default connect(state => {
        return {
            user: state.reducers.user,
        }
    },
    (dispatch) => (bindActionCreators({login, }, dispatch))
)(Login);

