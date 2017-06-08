import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, TouchableHighlight, TextInput, Button, RefreshControl, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/EvilIcons'
import Reply from './reply'
import {getCommentList, addComment, addReply} from '../../reducers/comment';



const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            text: '',
            textHeight: 40,
            replyUserName: '',
            commentId: undefined,
            refreshing: false,
        };
    }
    static navigationOptions = ({navigation})=>({
        title: '交流区',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="comment" size={20} color={tintColor} />
        )

    });

    componentWillMount(){

        this.props.getCommentList();

    }
    componentWillReceiveProps(nextProps){
        if (nextProps.commentList){
            this.setState({refreshing: false})
        }
        if (this.props.commentList !== nextProps.commentList){
            console.log(nextProps.commentList)
            this.setState({dataSource: ds.cloneWithRows(nextProps.commentList)})
        }
        if (!this.props.reload && nextProps.reload){
            this.props.getCommentList();
        }
    }

    review(commentId, userName){
        this.refs.input.focus();

        this.setState({ commentId , text: '@'+ userName+ ' '})
    }


    renderRow(rowData){


        return (
            <View key={rowData.id} style={styles.commentItem}>
                <TouchableHighlight onPress={this.review.bind(this,rowData.id,rowData.user.userName)} underlayColor="transparent" activeOpacity={.5}>
                    <View style={styles.commentContainer}>
                        <View style={styles.commentContent}>
                            <Text style={{lineHeight: 24}}>  {rowData.content}</Text>
                        </View>
                        <View style={styles.commentFooter}>
                            <Text style={{flex: 2, textAlign: 'right', fontStyle: 'italic',color: '#aea99c',fontSize: 12}}> {rowData.user.userName + '(' + rowData.user.character + ')'}</Text>
                            <Text style={{flex:1, textAlign: 'center', fontStyle: 'italic',color: '#aea99c',fontSize: 12}}>{rowData.created}</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                {
                    rowData.replys.length > 0 ?
                        <Reply replys={rowData.replys || []} commentId={rowData.id} showReply={this.review.bind(this)}/>
                        :
                        null
                }
            </View>

        )
    }

    onChangeText(event){
        console.log(event.nativeEvent)
        const { contentSize, text} = event.nativeEvent;
        this.setState({
            text: text,
            textHeight: contentSize.height > 100 ? 100 : contentSize.height
        });
    }
    onTextBlur(){
        this.setState({replyUserName: '', commentId: undefined})
    }
    onSubmit(){
        let {commentId,text} = this.state;
        Keyboard.dismiss();
        if (commentId){
            this.props.addReply({ commentId, content: text})
        }else {
            this.props.addComment({content: text})
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getCommentList()
    }

    render(){
        const {dataSource, text, textHeight} = this.state;

        return (
            <View style={styles.commentBox} >
                <ListView
                    dataSource={dataSource}
                    renderRow={ this.renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        ref="input"
                        style={{borderColor: 'gray',
                            borderWidth: 1,
                            width: '80%',
                            marginLeft: 20,
                            marginRight: 5,
                            borderRadius: 5,
                            height:textHeight}}
                        value={text}
                        underlineColorAndroid='transparent'
                        blurOnSubmit={true}
                        disableFullscreenUI={true}
                        multiline={true}
                        placeholder="说点什么吧..."
                        androidtextBreakStrategy="highQuality"
                        onChange={this.onChangeText.bind(this)}
                        onBlur={this.onTextBlur.bind(this)}
                    />
                    <Button
                        title='发布'
                        onPress={this.onSubmit.bind(this)}
                    />
                </View>

            </View>
        )
    }
}


export default connect( state => {
    return {
        ...state.comment
    }
}, dispatch => (bindActionCreators({ getCommentList, addComment, addReply },dispatch)))(Comment);


const styles = StyleSheet.create({
    commentBox: {
        flex: 1,
        backgroundColor: 'snow',

    },
    commentItem: {
        paddingTop: 20,
        paddingBottom: 5,
        marginTop: 1,
        borderColor: '#b6c4a7',
        borderStyle: 'dashed',
        borderBottomWidth: .3,
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    commentContainer: {
        paddingTop: 3,
        paddingBottom: 3
    },
    commentContent: {
        paddingBottom: 5,
    },
    commentFooter: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    commentInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginLeft: 20,
        borderRadius: 5,

    }

});