import React from 'react'
import { Menu, Icon } from 'antd';

const styles = {
    backgroundColor: '#fff',
    fontSize: '16px',
    lineHeight: '38px'
};

export default class HeadMenu extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            current: ""
        }
    }

    handleClick(item){

        if(this.props.onMenuClick){

            this.props.onMenuClick(item);
        }
    }

    render() {

        let { dataProvider=[], selectedKeys=[] } = this.props;

        let menus = dataProvider.map(function(menu,index){

            let { url, name, icon } = menu;

            return (
                <Menu.Item key={url}><Icon type={icon} />{name}</Menu.Item>
            )
        });

        return (
            <Menu
                onClick={this.handleClick.bind(this)}
                mode="horizontal"
                style={styles}
                selectedKeys={selectedKeys}
            >
                {menus}
            </Menu>
        )
    }
}