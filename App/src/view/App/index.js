import React, { Component } from 'react';

import { Text, View, ListView } from 'react-native'
// import Home from '../Home'
// import Schedule from '../schedule';

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
            <Text>abcd</Text>
        )
    }
}