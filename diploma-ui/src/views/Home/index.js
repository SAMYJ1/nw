import React from 'react'
import { Modal, Carousel, Spin } from 'antd';
// import Carousel from 'nuka-carousel'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getNoticeList} from '../../reducers/notice'
import './index.less';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showNoticeModal: false,
            content: '',
        }
    }
    componentWillMount(){
        this.props.getNoticeList({})
    }


    clickNoticeItem(value){

        this.setState({showNoticeModal: true, content: value})
    }

    render () {
        const { noticeList, } = this.props;
        const {showNoticeModal, content} = this.state;


        return (
            <div className="home">
                <div className="container">
                    <div className='topArea'>
                        <div className="topAreaLeft">
                            <div>
                                <h1>展示</h1>

                            </div>
                            <div className="carouselBox">
                                <Carousel autoplay>
                                    <div className="imgBox1" />
                                    <div className="imgBox2" />
                                    <div className="imgBox3" />
                                    <div className="imgBox4" />
                                    <div className="imgBox5" />
                                </Carousel>
                            </div>
                        </div>
                        <div className='topAreaRight'>
                            <div className="title">
                                <h1>公告</h1>
                            </div>
                            <div className="notice">
                                <ul>
                                    {
                                        noticeList.map((item,index) =>{
                                            return (

                                                <li className="noticeItem">
                                                    <a key={index} onClick={this.clickNoticeItem.bind(this, item.context)}>{item.title}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="guideContainer">
                        <div className="guideTitle">
                            <h1>工作室简介</h1>

                        </div>
                        <div className="guideContent">
                            <p>可乐音乐工作室成立于2012年，至2016年1月，共有三处总教学点，五处校外合作，
                                其中巨龙南路八佰城市走廊圆弧为可乐音乐工作室总部，占地面积300平。
                                集品牌乐器销售与音乐教育为一体。
                            </p>
                            <p>可乐音乐工作室不同于港城任何一个琴行或培训，她拥有
                                最年轻最专业的教师团队，旗下Family教师达数百名。一弄最独特最高端的学习系统和现代化教学理念。
                                可乐音乐工作室退出“乐理教学，情景授课，音乐鉴赏，音乐创作”等一系列有创意，以学员为本的各种
                                课程设计及服务内容，让每一个工作室的小朋友都能在良好的音乐环境及互动活动中取得在一般课堂中达不到的效果。
                            </p>
                            <p>她虽是一个年轻的品牌，却正因本着这严谨又独特的教学理念
                                与教学方式，在短短的三年里发光发热，成为连云港市最有影响力的音乐品牌。
                            </p>
                        </div>
                    </div>

                    <div className="activity">
                        <div className="title">
                            <h1>活动展示</h1>
                        </div>
                        <div className="activityShow">
                            <Carousel autoplay effect="fade">
                                <div className="imgBox1" ><p className="text">爵士鼓课堂</p></div>
                                <div className="imgBox2" ><p className="text">爵士鼓基本功练习</p></div>
                                <div className="imgBox3" ><p className="text">尤克里里课堂</p></div>
                                <div className="imgBox4" ><p className="text">吉他课堂</p></div>
                                <div className="imgBox5" ><p className="text">演出排练课堂</p></div>
                            </Carousel>
                        </div>

                    </div>
                    <div>

                    </div>

                </div>
                <Modal
                    title="公告信息"
                    width={400}

                    visible={showNoticeModal}
                    onCancel={()=>{this.setState({showNoticeModal: false})}}
                    footer={null}
                >
                    <div style={{minHeight:300, width: '80%', margin: '20px auto'}}>
                        <pre className="preStyle">
                            {content}
                        </pre>
                    </div>
                </Modal>

            </div>
        )
    }
}


export default connect(state=>{
    return {
        noticeList: state.reducers.notice.noticeList
    }
}, dispatch=>bindActionCreators({ getNoticeList }, dispatch))(Home)