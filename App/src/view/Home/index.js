import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Text, View, ListView, Image, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class Home extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie',
            ]),
        }
    }
    static navigationOptions = ({navigation})=> ({
        title: '首页',
        headerRight: (
            <Text onPress={()=>{navigation.state.params.handleClickMe()}}>我</Text>
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={20} color={tintColor} />
        ),
    });

    componentDidMount(){
        this.props.navigation.setParams({handleClickMe: this.onClickMe.bind(this) })
    }
    onClickMe(){
        alert('click me')
    }





    render(){



        return (

        <ScrollView>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Image style={{height: 200, width: 200, marginLeft: 92}} source={require('../../img/logo.jpg')}/>
            </View>
            <View style={{flex: 1, paddingTop: 22, paddingHorizontal: 8, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.imgBox1}>
                        <Image style={styles.img} source={require('../../img/img01.jpg')}/>
                    </View>
                    <Text style={styles.textArea1}>    可乐音乐工作室成立于2012年，至2016年1月，共有三处总教学点，五处校外合作，
                        其中巨龙南路八佰城市走廊圆弧为可乐音乐工作室总部，占地面积300平。
                        集品牌乐器销售与音乐教育为一体。</Text>
                </View>
                <View style={{flex: 1,flexDirection: 'row', marginTop: 10}}>
                    <Text style={styles.textArea2}>    可乐音乐工作室不同于港城任何一个琴行或培训，她拥有
                        最年轻最专业的教师团队，旗下Family教师达数百名。一弄最独特最高端的学习系统和现代化教学理念。
                        可乐音乐工作室退出“乐理教学，情景授课，音乐鉴赏，音乐创作”等一系列有创意，以学员为本的各种
                        课程设计及服务内容，让每一个工作室的小朋友都能在良好的音乐环境及互动活动中取得在一般课堂中达不到的效果。
                    </Text>
                    <View style={styles.imgBox2}>
                        <Image style={{height: 230, width: 176}} source={require('../../img/img02.jpg')}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={styles.imgBox3}>
                        <Image style={styles.img} source={require('../../img/img03.jpg')}/>
                    </View>
                    <Text style={styles.textArea3}>    她虽是一个年轻的品牌，却正因本着这严谨又独特的教学理念
                        与教学方式，在短短的三年里发光发热，成为连云港市最有影响力的音乐品牌。
                    </Text>
                </View>
                <View style={styles.footerLine}/>

            </View>
        </ScrollView>

        )
    }
}




const styles = StyleSheet.create({
    imgBox1: {
        borderStyle: 'solid',
        borderWidth: .5,
        padding: 2,
        backgroundColor: 'snow',
        flex: 1
    },
    imgBox2: {
        borderStyle: 'solid',
        borderWidth: .5,
        padding: 2,
        backgroundColor: 'snow',
        flex: 1,
        marginTop: 65
    },
    imgBox3: {
        borderStyle: 'solid',
        borderWidth: .5,
        padding: 2,
        backgroundColor: 'snow',
        flex: 1
    },

    img: {
        height: 220,
        width: 176,
    },
    textArea1: {
        position: 'relative',
        lineHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 60,
        marginLeft: 10,
        height: 160
    },
    textArea2: {
        position: 'relative',
        lineHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
    },
    textArea3: {
        position: 'relative',
        lineHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
        marginTop: 60,
    },
    footerLine: {
        height: 0,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'pink',
        flex: 1,
        marginHorizontal: '7%',
        marginTop: 20,
        marginBottom: 20,
    }
});