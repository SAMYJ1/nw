import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, ListView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {getNoticeList, addNotice, deleteNotice } from '../../reducers/notice';


class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    }
    componentWillMount(){
        this.props.getNoticeList();
    }

    clickNoticeItem(content){
        this.props.navigation.navigate('ShowNoticeDetail',{content})
    }

    renderRow(rowData){

        return (
            <View style={styles.noticeItemBox }>
                <TouchableOpacity onPress={this.clickNoticeItem.bind(this,rowData.content)}>
                    <View style={styles.noticeItem }>
                        <View style={styles.noticeTitle}>
                            <Text>{rowData.title}</Text>
                        </View>
                        <View style={styles.noticeTime}>
                            <Text>{rowData.pubDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        // const {dataSource } = this.state;
        const {noticeList, } = this.props;
        const dataSource = this.ds.cloneWithRows([noticeList]);

        return (
            <View style={{flex: 1, backgroundColor: 'snow'}}>
                <View>
                    <ListView
                        renderRow={this.renderRow.bind(this)}
                        dataSource={dataSource}
                    />
                </View>
            </View>
        )
    }
}

export default connect(state => {
    return {
        ...state.notice
    }
}, dispatch=> bindActionCreators({ getNoticeList, addNotice, deleteNotice  },dispatch))(Notice);

const styles = StyleSheet.create({
    noticeItemBox:{

    },
    noticeItem: {
        flexDirection: 'row',
    },
    noticeTitle: {

    },
    noticeTime: {

    }
});