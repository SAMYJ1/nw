import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login, } from '../../reducers/user'
import { ActivityIndicator, Toast } from 'antd-mobile'
import {RadioGroup, RadioButton,  } from 'react-native-flexi-radio-button'
import NavigationUtil from '../../utils/NavigationUtil';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            role: '',
        };
    }
    componentDidMount(){
        console.log('from redux', this.props.isLogin)
    }

    componentWillReceiveProps(nextProps){
        this.setState({animating: false})
        if (!this.props.isLogin && nextProps.isLogin && nextProps.character !=='admin'){
            console.log('will receive props', this.props.isLogin, nextProps.isLogin)
            // this.props.navigation.navigate('Home')
            NavigationUtil.reset(this.props.navigation, 'Home')
        }
        if (!this.props.isLogin && nextProps.isLogin && nextProps.character === 'admin'){
            NavigationUtil.reset(this.props.navigation, 'Admin')
        }
    }

    selectRole(index, value){

        this.setState({role: value})
    }
    onChangeUserName(value){
        this.setState({userName: value})

    }
    onChangePasswd(value){
        this.setState({password: value})

    }

    onLogin(){
        const { userName, password, role,  } = this.state;
        Toast.loading('登录中' , 0)
        this.props.login({account:userName, password, character:role})


    }

    render(){
        const {userName, password, role, } = this.state;
        const buttonStatus = (userName && password && role) === '' || false;


        return (
            <View style={{flex: 1}}>
                <View style={styles.loginBox}>
                    <View style={styles.rowItem}>
                        <Text style={styles.label}>用户名：</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="用户名"
                            androidtextBreakStrategy="highQuality"
                            underlineColorAndroid='transparent'
                            onChangeText={this.onChangeUserName.bind(this)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.label}>  密  码：</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="密码"
                            underlineColorAndroid='transparent'
                            onChangeText={this.onChangePasswd.bind(this)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.label}>  角  色：</Text>
                        <RadioGroup onSelect={this.selectRole.bind(this)} style={styles.rowItem}>
                            <RadioButton value={'student'}><Text>学生</Text></RadioButton>
                            <RadioButton value={'teacher'}><Text>教师</Text></RadioButton>
                            <RadioButton value={'admin'}><Text>管理员</Text></RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={styles.loginBtn}>
                        <Button
                            onPress={this.onLogin.bind(this)}
                            disabled={buttonStatus}
                            title="登录"
                            color={"#9e70ff"}
                        />
                    </View>
                </View>

            </View>
        )
    }
}

export default connect(state =>{
    return {
        ...state.user
    }
},dispatch => bindActionCreators({ login }, dispatch))(Login)


const styles = StyleSheet.create({
    loginBox: {
        marginTop: 50,
        flex: 1,
        marginHorizontal: '15%'
    },
    rowItem: {
        flexDirection: 'row',
        marginTop: 10,
    },
    label: {
        marginTop: 10,
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '70%',
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        borderRadius: 5,
    },
    loginBtn: {
        width: '50%',
        marginLeft: '25%'
    }
});