import React, {Component,PropTypes} from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {formatDate} from '../../utils/formateDate';



export default class Reply extends Component{
    constructor(props){
        super(props);
    }
    static propsTypes = {
        replys: PropTypes.array.isRequired,
        showReply: PropTypes.func.isRequired,
        commentId: PropTypes.string.isRequired
    };

    onReply(commentId, userName){
        this.props.showReply(commentId, userName)
    }

    render(){
        const {replys, commentId} = this.props;

        return (
            <View style={styles.replyBox}>
                {
                    replys.map((item,index)=>{
                        return (
                        <TouchableHighlight key={index} onPress={this.onReply.bind(this,commentId, item.userInfo.userName)} underlayColor="transparent" activeOpacity={.5}>
                            <View style={styles.replyItem}>
                                <View style={styles.content}>
                                    <Text>{item.content}</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={{flex: 2, textAlign: 'right',fontStyle: 'italic', color: '#aea99c'}}>{item.userInfo.userName + '(' + item.userInfo.character + ')'}</Text>
                                    <Text style={{flex: 1, textAlign: 'center', fontStyle: 'italic', color: '#aea99c'}}>{item.created}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    replyBox: {
        paddingLeft: 20,
    },

    replyItem: {
        borderLeftWidth: 2,
        borderLeftColor: '#e4e5ee',
        paddingTop: 5,
        paddingBottom: 3,
        marginBottom: 4,
        borderTopWidth: .3,
        borderTopColor: '#b9b9b9',
        borderStyle: 'dashed'
    },
    content: {
        paddingLeft: 3,
    },
    footer: {
        flexDirection: 'row',
    }
});