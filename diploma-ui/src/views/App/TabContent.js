import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Tabs, Button, } from 'antd';
import views from '../index';
import {selectedTab, removeTab, removeAllTabs, homeTab } from '../../reducers/config';

const TabPane = Tabs.TabPane;

class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClose:false,
        }
    }
    onChange(key) {
        let action = {
            key,
        };
        this.props.selectedTab(action);
    }
    onEdit(targetKey, action) {
        this[action](targetKey);
    }

    remove(key) {

        if ( key !== homeTab.key ) {

            let action = {
                key,
            };

            this.props.removeTab(action);
        }
    }

    getTabPanel(panelObj){
        let {url, params = {}, title, key} = panelObj;
        let comp =  views[url];
        let panel = "还没有实现"+title;
        params.key = key;
        if(comp){
            if(!title){
                title = comp.getTitle && comp.getTitle(params) || ''
            }

            panel =  React.createElement(comp,{params});
        }
        return (<TabPane tab={title} key={key}>{panel}</TabPane>);
    }

    closeAllTabs() {
        this.props.removeAllTabs();
    }

    render() {
        let {tabs,activeTabKey} = this.props;
        let closeAllBtn = (<Button icon="delete" onClick={ this.closeAllTabs.bind(this) }>关闭所有</Button>);

        return (
            <div style={{width:'100%',overflowY:'auto', }}>
                <div  style={{ padding: '5px 5px 0 10px' }} >
                    {
                        <Tabs
                            hideAdd
                            onChange={this.onChange.bind(this)}
                            activeKey={activeTabKey }
                            type="editable-card"
                            onEdit={this.onEdit.bind(this)}
                            tabBarExtraContent={ closeAllBtn }
                            className='navTab'
                        >
                            {tabs.map(pane => this.getTabPanel(pane))}
                        </Tabs>
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => {
        return {
            tabs:state.reducers.config.tabs,
            activeTabKey:state.reducers.config.activeTabKey

        }
    },
    (dispatch) => (bindActionCreators({selectedTab,removeTab, removeAllTabs }, dispatch))
)(TabContent);

