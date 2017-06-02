import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native';
import {WhiteSpace, WingBlank, List , InputItem, TextareaItem, Toast} from 'antd-mobile'
import { addNotice } from '../../reducers/notice';
import Icon from 'react-native-vector-icons/Entypo'



class AddNotice extends Component{
    constructor(props){
        super(props);
        this.state = {
            noticeTitle: '',
            noticeContent: '',
        }
    }
    static navigationOptions = ({navigation})=> ({
        title: '添加公告',
        headerRight: (
            <Text
                onPress={() => {
                    navigation.state.params.saveNotice()
                }}
            >保存   </Text>

        ),
    });

    componentDidMount(){
        this.props.navigation.setParams({saveNotice: this.onSaveNotice.bind(this)})
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.saved && nextProps.saved){
            Toast.hide();
            Toast.success('保存成功',1);
            setTimeout(()=>{
                Toast.hide();
            },1000)
        }
    }

    onSaveNotice(){
        const {noticeTitle, noticeContent} = this.state;
        this.props.addNotice({title: noticeTitle, context: noticeContent})
        Toast.loading('',0)
    }


    noticeTitleChange(value){
        console.log(value);
        this.setState({noticeTitle: value})
    }
    onNoticeContentChange(value){
        this.setState({noticeContent: value})
    }

    render(){


        return (
            <View style={styles.container}>
                <View style={styles.formArea}>
                    <View>
                        <List renderHeader={()=> '标题'}>
                            <WhiteSpace size="1g"/>
                            <InputItem
                                placeholder="公告标题"
                                data-seed="logId"
                                onChange={this.noticeTitleChange.bind(this)}
                            />
                            <WhiteSpace size="1g"/>
                        </List>

                    </View>
                    <View>
                        <List renderHeader={()=> '内容'}>
                            <WhiteSpace size="1g"/>
                            <TextareaItem
                                title="内容"
                                rows={10}
                                placeholder="公告内容..."
                                onChange={this.onNoticeContentChange.bind(this)}
                            />
                            <WhiteSpace size="1g"/>
                        </List>

                    </View>

                </View>
            </View>
        )
    }
}

export default connect(state => {
    return {
        ...state.notice
    }
}, dispatch=> bindActionCreators({ addNotice }, dispatch))(AddNotice)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f9'
    },
    formArea: {
        flex: 1,
        marginTop: 40,
    }
});