import React,{Component,PropTypes} from 'react'
import {formatDate} from '../../../utils/formateDate';
import { Row, Col } from 'antd';
import style  from './index.less';

export default class Reply extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        replys: PropTypes.array.isRequired,
        k: PropTypes.number.isRequired,
        showReply: PropTypes.func.isRequired
    };
    render(){
        const {replys,k,showReply} = this.props
        return(
            <div className={style.replyBody}>
                {replys.map((reply,index)=>

                    <div className={style.replyItem} key={index}>
                        <div className={style.replyContent}>
                            <a>{reply.userInfo.userName}</a>
                            <p>{reply.content}</p>
                        </div>

                        <div className={style.replyFoot}>
                            <Row>
                                <Col span={6}>
                                    <span>{formatDate(reply.created)}</span>
                                </Col>
                                <Col offset={16} span={2}>
                                    <a onClick={e=>showReply(reply.userInfo.userName)}>回复</a>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}