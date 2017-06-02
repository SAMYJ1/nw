import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, ListView, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import {getNoticeList, deleteNotice } from '../../reducers/notice';
import Icon from 'react-native-vector-icons/Ionicons';
import {NoticeBar, WhiteSpace, Toast} from 'antd-mobile'

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1 !== r2});

class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            refreshing: false,
        };
    }
    static navigationOptions = ({navigation})=> ({
        title: '公告',
        headerRight: (
            <Text onPress={()=>{console.log(navigation);navigation.state.params.addNewNotice()}}>新增   </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-calendar-outline" size={20} color={tintColor} />
        )
    });

    componentWillMount(){
        this.props.getNoticeList();
        Toast.loading('加载中',0, null, false);
    }
    componentDidMount(){
        console.log('mounted')
        this.props.navigation.setParams({addNewNotice: this.handleAddNotice.bind(this) })

    }
    componentWillReceiveProps(nextProps){
        if (nextProps.noticeList){
            this.setState({refreshing: false})
        }
        if (this.props.noticeList !== nextProps.noticeList){
            console.log('receive props', nextProps);
            this.setState({dataSource:ds.cloneWithRows(nextProps.noticeList)})
            Toast.hide()
        }
    }

    handleAddNotice(){
        this.props.navigation.navigate('NewNotice',{foo:'bar'})
    }

    clickNoticeItem(content){
        this.props.navigation.navigate('NoticeDetail',{content})
    }

    renderRow(rowData){

        return (

            <TouchableOpacity onPress={this.clickNoticeItem.bind(this, rowData.context)}>
                <View style={styles.noticeItemBox }>
                    <WhiteSpace size="1g"/>
                    <View style={styles.noticeItem }>
                        <View style={styles.noticeTitle}>
                            <Text style={styles.titleText}>{rowData.title}</Text>
                        </View>
                        <View style={styles.noticeTime}>
                            <Text style={styles.timeText}>{rowData.pubDate}</Text>
                        </View>
                    </View>
                    <WhiteSpace size="1g"/>
                </View>
            </TouchableOpacity>

        )
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getNoticeList()
    }


    render(){
        const {dataSource } = this.state;
        console.log(dataSource, )

        return (
            <View style={{flex: 1, backgroundColor: 'snow'}}>
                <View style={styles.HeaderTitle}>
                    <Text style={styles.headerText}>公告列表</Text>
                </View>
                <View style={styles.noticeContainer}>
                    <ListView
                        renderRow={this.renderRow.bind(this)}
                        dataSource={dataSource}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
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
}, dispatch=> bindActionCreators({ getNoticeList, deleteNotice  },dispatch))(Notice);

const styles = StyleSheet.create({
    HeaderTitle: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 15,

    },
    headerText: {
        fontStyle: 'normal',
        fontSize: 24,
    },
    noticeContainer:{
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },

    noticeItemBox:{
        borderStyle: 'dashed',
        borderTopWidth: .5,
        height: 50
    },
    noticeItem: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#eeeae7'
    },
    noticeTitle: {
        flex: 1,
        // width: '75%'
    },
    titleText: {
        lineHeight: 20,
        fontSize: 18,
        marginTop: 15,
        marginLeft: 20
    },
    noticeTime: {

    },
    timeText: {
        lineHeight:15,
        marginTop: 18,
    }
});