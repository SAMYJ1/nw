import React from 'react'
import { Alert } from 'antd';
import styles from './index.less'

export default class Home extends React.Component {

    constructor () {
        super()
    }

    render () {
        return (
            <div className={ styles.homePic }>
                <Alert
                    message="主页"
                    description="选择菜单进入相应模块"
                    type="info"
                    showIcon
                />
            </div>
        )
    }
}
