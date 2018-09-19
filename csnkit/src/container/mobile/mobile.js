import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { mobile, sendcode } from '../../redux/user.redux'
// import commForm from '../../component/comm-form/comm-form'

@connect(
    state=>state.user,
    { mobile, sendcode }
)
// @commForm
class Mobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',
            code: '',
            codeBtnTitle: '点击获取',
            enableMobileBtn: false,
        }
        this.handleChangeMobile = this.handleChangeMobile.bind(this)
        this.handleChangeCode = this.handleChangeCode.bind(this)
        this.handleSendcode = this.handleSendcode.bind(this)
        this.handleMobile = this.handleMobile.bind(this)
    }

    componentDidMount () {
        this._isMounted = true
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    handleMobile() {
        this.props.mobile(this.state)
    }

    handleChangeMobile(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleChangeCode(key, val) {
        let enableMobileBtn = false
        let mobile = this.state.mobile
        let code = this.state.code
        mobile = mobile.replace(/\s*/g, '')
        code = code.replace(/\s*/g, '')

        //输入了手机号和短信验证码，开启登陆按钮
        if(code.length === 5 && mobile.length === 11) {
            enableMobileBtn = true
        }

        this.setState({
            [key]: val,
            enableMobileBtn: enableMobileBtn
        })
    }

    _countdown() {
        let _th = this

        /**
         * 实现倒计时
         */
        let timeCount = 60
        if (_th._isMounted) {
            this.setState({
                codeBtnTitle: timeCount + 'S',
            })
        }
        let intervalID = setInterval( () => {
            if(--timeCount <= 0) {
                clearInterval(intervalID)
                if (_th._isMounted) {
                    this.setState({
                        codeBtnTitle: '点击获取',
                    })
                }
            } else {
                if (_th._isMounted) {
                    this.setState({
                        codeBtnTitle: timeCount+'S',
                    })
                }
            }
        }, 1000)
    }

    handleSendcode() {
        let mobile = this.state.mobile
        mobile = mobile.replace(/\s*/g, '')
        if(mobile.length === 11) {
            this.props.sendcode(this.state)
            this._countdown()
        }
    }

    render() {
        let mobileButton = <Button type='primary' disabled>登录</Button>
        if(this.state.enableMobileBtn) {
            mobileButton = <Button onClick={this.handleMobile} type='primary'>绑定</Button>
        }

        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/mobile') ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            type="phone"
                            placeholder="186 1234 1234"
                            onChange={v=>this.handleChangeMobile('mobile',v)}
                            value={this.state.mobile}
                        >手机号码</InputItem>
                        <InputItem
                            type="number"
                            maxLength="6"
                            placeholder="123456"
                            onChange={v=>this.handleChangeCode('code',v)}
                            value={this.state.code}
                        >验证码</InputItem>
                        <List.Item extra="未注册自动绑定">
                            <Button
                                type="ghost"
                                inline
                                size="small"
                                className="am-button-borderfix"
                                onClick={this.handleSendcode}
                            >{this.state.codeBtnTitle}</Button>
                        </List.Item>
                    </List>
                    <WhiteSpace />
                </WingBlank>
                {mobileButton}
            </div>
        )
    }
}

export default Mobile
