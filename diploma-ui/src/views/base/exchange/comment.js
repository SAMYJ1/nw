import React,{Component,PropTypes} from 'react'
import {formatDate} from '../../../utils/formateDate';
import { Row, Col, Input, Button, Icon} from 'antd';
import Reply from './reply';
import style from './index.less';


export default class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            showReplyBox: false,
            mention: '',
            replyComment: '',
            newComment: '',
        }

    }
    static PropTypes = {
        commentList: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
        submitComment: PropTypes.func.isRequired,
        submitReply: PropTypes.func.isRequired,

    };

    componentDidUpdate(prevProps, prevState){
        if (!prevState.showReplyBox && this.state.showReplyBox ){
            this.refs.reply.focus()
        }
    }

    showReply(userName){
        console.log("click",userName)
        const { auth={userName:'myj'} } = this.props;

        if (true){
            this.setState({showReplyBox: true, mention: userName, replyComment: '@'+ userName+ ' '})
        }else {
            console.log('请登录')
        }


    }

    goComment(){
        const { auth={userName:'myj'} } = this.props;
        if (auth.userName){

        }else {
            //请登录

        }
    }

    onReplyChange(e){
        this.setState({replyComment: e.target.value})
    }
    onCommentChange(e){
        this.setState({newComment: e.target.value})
    }


    handleSubmitReply(id){

        const { replyComment } = this.state;

        this.props.submitReply(id, replyComment);
        this.setState({showReplyBox: false})
    }
    cancelSubmitReply(){
        this.setState({showReplyBox: false})
    }
    onSubmitComment(){
        const { newComment } = this.state;

        this.props.submitComment(newComment);
    }


    render(){
        const {commentList, auth = true, } = this.props;
        const { mention, showReplyBox, replyComment  } = this.state;

        return(
            <div>

                <div className={style.commentHead}>
                    <Row>
                        <Col span={4}>
                            {commentList.length || 0} 条评论
                        </Col>
                        <Col offset={15} span={4}>
                            <a onClick={::this.goComment}> <Icon type="edit" className={style.editIcon}/> 添加新评论</a>
                        </Col>
                    </Row>
                </div>
                {
                    auth ?
                        <div className={style.commentBox}>

                            <Row>
                                <Col span={6} offset={3}>
                                    <h1>请添加新评论...</h1>
                                </Col>
                                <Col offset={3} span={18}>
                                    <Input type="textarea" rows={4} onChange={ ::this.onCommentChange }/>
                                </Col>
                            </Row>
                            <Row className={style.commentSubmit}>
                                <Col offset={19} span={6}>
                                    <Button onClick={ ::this.onSubmitComment}>提交</Button>
                                </Col>
                            </Row>

                        </div>
                        :
                        ''
                }
                <div className={style.commentBody}>
                    {commentList.map((comment, index) =>
                        <div key={index} className={style.commentItem}>
                            <div className={style.content}>
                                <div className={style.comment}>
                                    <div className={style.commentHeader}>
                                        <Row>
                                            <Col span={6}>
                                                <a>{comment.userId.userName}</a>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}>
                                                <span>{formatDate(comment.created)}</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className={style.commentContainer}>
                                        <p>{comment.content}</p>
                                    </div>

                                    <div className={style.commentFooter}>
                                        <Row>
                                            <Col offset={22} span={2}>
                                                <a onClick={ e=>this.showReply(comment.userId.userName)}>回复</a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                <Reply replys={comment.replys} k={index} showReply={ ::this.showReply}/>

                                {
                                    showReplyBox ?
                                    <div className={style.replyBox}>
                                        <Row>
                                            <Col span={12}>
                                                <Input type='textarea' rows={3} ref="reply" value={replyComment} onChange={ ::this.onReplyChange }/>
                                            </Col>
                                        </Row>
                                        <Row className={style.buttonWrap}>
                                            <Col offset={2} span={4}>
                                                <Button onClick={e=>this.handleSubmitReply(comment._id)}>提交</Button>
                                            </Col>
                                            <Col span={4}>
                                                <Button onClick={::this.cancelSubmitReply}>取消</Button>
                                            </Col>

                                        </Row>
                                    </div>
                                    :
                                    ''
                                }

                            </div>
                        </div>
                    )}
                </div>
            </div>
        )

    }
}