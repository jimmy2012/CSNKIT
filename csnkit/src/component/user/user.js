import React from 'react'
import { connect } from 'react-redux'
import { Result, Badge, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import userImg from './user.png'
import applyImg from './apply2.png'
import writeImg from './write2.png'
import msgImg from './msg.png'
import boughtImg from './bought.png'
import setImg from './set.png'
import logoutImg from './logout.png'

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert
        alert('注销', '确认退出登录吗？？？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            } }
        ])
    }

    render() {
        const props = this.props
        const Item = List.Item
        const myImg = src => <img src={src} alt='个人图像' />
        const tuser = props.type==='author' ? '【作者】' : '【读者】'
        const desc = tuser + (props.desc ? props.desc : '')
        return props.user ? (
            <div id='user-page'>
                <Result
                    img={myImg(props.avatar? props.avatar.uri : userImg)}
                    title={props.user}
                    message={desc}
                />
                <WhiteSpace size='xs' />
                <List>
                    {
                        props.type==='author' ? <Item
                            style={{zIndex: 21}}
                            thumb={<img src={writeImg} alt='Write' />}
                            extra={<Badge text={'即将推出'} style={{ marginLeft: 16 }} />}
                        >
                            开始写作
                        </Item> : props.apply ? <Item
                            style={{zIndex: 21}}
                            arrow='horizontal'
                            thumb={<img src={applyImg} alt='Apply' />}
                            extra={<Badge text={'平台审核中'} style={{ marginLeft: 16 }} />}
                        >
                            申请成为作者
                        </Item> : <Item
                            style={{zIndex: 21}}
                            arrow='horizontal'
                            thumb={<img src={applyImg} alt='Apply' />}
                            onClick={() => {props.history.push('/author')}}
                        >
                            申请成为作者
                        </Item>
                    }
                    <Item
                        style={{zIndex: 21}}
                        arrow='horizontal'
                        thumb={<img src={msgImg} alt='Msg' />}
                        onClick={() => {}}
                    >
                        消息中心
                    </Item>
                    <Item
                        style={{zIndex: 22}}
                        arrow='horizontal'
                        thumb={<img src={boughtImg} alt='Bought' />}
                        onClick={() => {props.history.push('/purchased')}}
                    >
                        已购
                    </Item>
                    <Item
                        style={{zIndex: 23}}
                        arrow='horizontal'
                        thumb={<img src={setImg} alt='Set' />}
                        onClick={() => {props.history.push('/profile')}}
                    >
                        设置
                    </Item>
                    <Item
                        style={{zIndex: 24}}
                        thumb={<img src={logoutImg} alt='Logout' />}
                        onClick={this.logout}
                    >
                        退出登录
                    </Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}

export default User
