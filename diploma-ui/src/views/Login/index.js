import React, { PropTypes } from 'react'
import { Form, Input, Button, Row, Col, notification,Icon } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login,  } from '../../reducers/user'


const FormItem = Form.Item;

import styles from './index.less';

const propTypes = {
    user: PropTypes.object,
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
        this.hospitalCode = localStorage.getItem("hospitalCode");
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
    }

    componentDidMount() {

        this.setCache();
    }

    setCache() {

        let { hospitalCode, userCode } = this;

        this.props.form.setFieldsValue({ hospitalCode, userCode })
    }

    resetAll(){
        this.props.form.resetFields();
    }

    handleSubmit (e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.login(data);
        localStorage.clear();
        localStorage.setItem("hospitalCode",data.hospitalCode);
        localStorage.setItem("userCode",data.userCode);

    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const hospitalCodeProps = getFieldDecorator('hospitalCode',{
            initialValue: ""
        });
        const userCodeProps = getFieldDecorator('userCode',{
            initialValue: ""
        });
        const passwordProps = getFieldDecorator('password');
        return (
            <div className={styles.content}>
                <div className={styles.main}>
                    <div className={styles.mainHead}>
                        <span>唐古中医诊所处方管家</span>
                    </div>
                    <div className={styles.mainLogin}>
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
                                            hospitalCodeProps
                                            (
                                                <Input className={styles.input}  prefix={<Icon type="user" />} placeholder='医院代码' />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem
                                        className={styles.word}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        {
                                            userCodeProps
                                            (
                                                <Input className={styles.input}  prefix={<Icon type="user" />} placeholder='用户' />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem
                                        className={styles.word}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        {
                                            passwordProps
                                            (
                                                <Input className={styles.input} type='password' prefix={<Icon type="lock" />} placeholder='密码' />
                                            )
                                        }
                                    </FormItem>
                                    <Row>
                                        <Col span={9} >
                                            <Button  className={styles.bt} loading={this.props.user.loadingLogin} style={{background: '#ff9a29'}} htmlType='submit'>登录</Button>
                                        </Col>
                                        <Col span={9} offset={6}>
                                            <Button className={styles.bt} onClick={this.resetAll.bind(this)}>重置</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.foot}>

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

