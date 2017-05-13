import React, { Component } from 'react';
import { TabBar, Icon, Button } from 'antd-mobile';
import { Text, View, ListView } from 'react-native'

export default class Home extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ]),
        }
    }



    renderRow(rowData){

        return(
            <Text>{rowData}</Text>
        )
    }

    render(){
        const { dataSource } = this.state;


        return (

            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={dataSource}
                    renderRow={ this.renderRow.bind(this) }
                />
            </View>
        )
    }
}