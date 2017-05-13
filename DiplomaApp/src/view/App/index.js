import React, { Component } from 'react';
import { TabBar, Icon, Button } from 'antd-mobile';
import { Text, View, ListView } from 'react-native'
import Home from '../Home'
import Schedule from '../schedule';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state= {
            selectedTab: 'schedule',

            hidden: false,
        }
    }




    render(){
        const { selectedTab } = this.state;


        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="首页"
                    key="首页"
                    selected={ selectedTab === 'home'}
                    onPress={() => {this.setState({selectedTab: 'home',})}}
                >
                    <Home/>

                </TabBar.Item>
                <TabBar.Item
                    title="课表"
                    key="课表"
                    selected={selectedTab === 'schedule'}
                    onPress={() => {this.setState({selectedTab: 'schedule',})}}
                >
                    <Schedule/>
                </TabBar.Item>
                <TabBar.Item
                    title="课程信息"
                    key="课程信息"
                    dot
                    selected={selectedTab === 'course'}
                    onPress={() => {this.setState({selectedTab: 'course',})}}
                >
                    <Text>课程信息</Text>
                </TabBar.Item>
                <TabBar.Item
                    title="交流"
                    key="交流"
                    selected={selectedTab === 'comment'}
                    onPress={() => {this.setState({selectedTab: 'comment',})}}
                >

                </TabBar.Item>
            </TabBar>
        )
    }
}