import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class ShowNoticeDetail extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static navigationOptions = ({navigation})=>({
        title: '公告详情',
    });


    render(){
        const { params } = this.props.navigation.state;
        console.log('showNotice renderd',params)

        return (
            <View style={styles.body}>
                {
                    params.content ?
                        <View style={styles.container}>
                            <Text style={styles.contentText}>{params.content}</Text>
                        </View>
                        :
                        <View style={styles.container}>
                            <Text style={{marginTop:'50%', marginLeft: '44%'}}>暂无数据</Text>
                        </View>
                }

            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'snow',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    contentText: {
        lineHeight: 18,
        fontSize: 16,

    }
});