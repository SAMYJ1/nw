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
        this.account = localStorage.getItem("account");
    }

    // componentWillMount(){
    //   this.props.resetInitialState()
    // }
    componentWillReceiveProps(nextProps) {
        const user = nextProps.user;

        if (user.account) {
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

        let {  account } = this;

        this.props.form.setFieldsValue({  account })
    }

    resetAll(){
        this.props.form.resetFields();
    }

    handleSubmit (e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.login(data);
        localStorage.clear();
        localStorage.setItem("account",data.account);
        localStorage.setItem("character",data.character);

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
                                getFieldDecorator('account',{
                                    initialValue: "",
                                    rules: [{required: true, message: '请输入账号'}],
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
                                getFieldDecorator('password',{
                                    rules: [{required: true, message: '请输入密码'}],
                                })
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
                                getFieldDecorator('character',{
                                    initialValue: 'student',
                                    rules: [{required: true, message: '请选择'}],
                                })
                                (
                                    <RadioGroup>
                                        <Radio key="1" value={'student'}>学生</Radio>
                                        <Radio key="2" value={'teacher'}>教师</Radio>
                                        <Radio key="3" value={'admin'}>管理员</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <Row>
                            <Col span={6} offset={3}>
                                <Button  className={styles.bt} style={{}} loading={this.props.user.loading} htmlType='submit'>登录</Button>
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

