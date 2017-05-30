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

    formatCourseDetailData(courseData){
        if (!courseData) return;
        console.log('unformated',courseData)
        let {list,title} = courseData;
        let newList = list && list.map(listItem =>{
                delete listItem.id;
                return {courseType:listItem.courseType, ...listItem.customizedCourses};
            });
        let newTitle = title && Object.entries(title).map(item =>{
                return {dataIndex: item[0], title: item[1]}

            });
        console.log("formated from back",courseData);

        return {...courseData,list: newList, title: newTitle}
    }

    render(){
        const { loading, courseInfoList  } = this.props;


        return (
            <div>
                <Tabs tabPosition="left" defaultActiveKey='0' className={style.content}>
                    {
                        courseInfoList.map((item, index)=>{
                            let newData = this.formatCourseDetailData(item)
                            return (
                                <TabPane tab={item.courseName} key={index}>
                                    <div className={style.courseTable}>
                                        <CourseInfoDetail
                                            dataSource={newData.list || []}
                                            tableTitle={newData.title || []}
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