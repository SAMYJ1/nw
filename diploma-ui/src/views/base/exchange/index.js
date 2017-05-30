import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comment from './comment';
import { getCommentList, addComment, addReply } from '../../../reducers/exchange';
import style from './index.less';



class Exchange extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        };
    }
    componentDidMount(){
        this.props.getCommentList()
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.reload && nextProps.reload ){
            this.props.getCommentList()
        }
    }

    handleSubmitComment(content){

        //提交新评论
        this.props.addComment({content:content})
    }
    //提交回复
    handleSubmitReply(id, content){

        console.info("reply!!! ", content);
        this.props.addReply({commentId:id, content})
    }


    render(){
        const { commentList,auth, } = this.props;

        return (
            <div>
                <div className={style.body}>
                    <div className={style.header}>
                        <h1>课下交流区</h1>
                    </div>
                    <div className={style.commentArea}>
                        <Comment commentList={commentList} auth={auth}
                                 submitComment={::this.handleSubmitComment}
                                 submitReply={::this.handleSubmitReply}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(state=>{
    return {
        commentList: state.reducers.exchange.commentList,
        reload: state.reducers.exchange.reload,
        auth: {
            userName: state.reducers.user.userName,
        }
    }
},dispatch=>(bindActionCreators({ getCommentList, addComment, addReply }, dispatch)))(Exchange)