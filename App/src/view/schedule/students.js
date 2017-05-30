import React,{Component} from 'react';
import {View, Text, ListView, StyleSheet} from 'react-native';


export default class StudentList extends Component{
    static navigationOptions = ({navigation})=>({
        title: '上课学生'
    });

    constructor(props){
        super(props);

        this.state= {

        }
    }

    renderRow(rowData){
        return(
            <View style={styles.row}>
                <Text style={{paddingLeft: 20}}>{rowData}</Text>
            </View>
        )
    }

    render(){
        const { params } = this.props.navigation.state;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource =  ds.cloneWithRows(params.students);

        return(
            <View>
                <View>
                    <ListView
                        dataSource={dataSource}
                        renderRow={ this.renderRow.bind(this) }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 1,
        backgroundColor: 'snow'
    }
});