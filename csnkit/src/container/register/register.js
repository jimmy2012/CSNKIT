import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import commForm from '../../component/comm-form/comm-form'

@connect(
    state=>state.user,
    { register }
)
@commForm
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    login() {
        this.props.history.push('/login')
    }

    handleRegister() {
         this.props.register(this.props.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用 户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('passwd',v)}
                        >密 码</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('repeatepwd',v)}
                        >确认密码</InputItem>
                        <WhiteSpace />
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                    <WhiteSpace />
                    <Button onClick={this.login} type='primary'>取消</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register
