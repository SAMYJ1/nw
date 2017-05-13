import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import CourseInfoDetail from './courseInfoDetail';
import { getCourseInfoList } from '../../../reducers/courseInfo';
import style from './index.less';


const TabPane = Tabs.TabPane;

class CourseInfo extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        this.props.getCourseInfoList()
    }



    render(){
        const { loading, courseInfoList  } = this.props;


        return (
            <div>
                <Tabs tabPosition="left" defaultActiveKey='0' className={style.content}>
                    {
                        courseInfoList.map((item, index)=>{
                            return (
                                <TabPane tab={item.courseName} key={index}>
                                    <div className={style.courseTable}>
                                        <CourseInfoDetail
                                            dataSource={item.list || []}
                                            tableTitle={item.title || []}
                                        />
                                    </div>

                                </TabPane>
                            )
                        })
                    }


                </Tabs>
            </div>
        )
    }
}


export default connect(state => {
    return {
        ...state.reducers.courseInfo
    }
}, dispatch => bindActionCreators({ getCourseInfoList  }, dispatch))(CourseInfo)