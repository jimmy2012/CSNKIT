import React from 'react'
import { Toast, Badge, List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUser, update } from '../../redux/user.redux'
import commForm from '../comm-form/comm-form'

@connect(
    state=>state,
    {getUser, update}
)
@commForm
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        this.props.update(this.props.state)
        Toast.success('资料更新成功', 1)
    }

    componentDidMount() {
        this.props.getUser()

        setTimeout(() => {
            Toast.hide()
          }, 3000)
    }

    componentWillUnmount() {
    }

    render() {
        const user = this.props.user
        return (
            <div id='profile-page'>
                <List renderHeader={() => '个人资料'}>
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                        placeholder='用户名'
                        disabled
                        defaultValue={user.user}
                    >用户名</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('realname',v)}
                        placeholder='真实姓名'
                        defaultValue={user.realname}
                    >真实姓名</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('gender',v)}
                        placeholder='性别'
                        defaultValue={user.gender}
                    >性别</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('desc',v)}
                        placeholder='描述'
                        defaultValue={user.desc}
                    >描述</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('position',v)}
                        placeholder='职位'
                        defaultValue={user.position}
                    >职位</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('company',v)}
                        placeholder='公司'
                        defaultValue={user.company}
                    >公司</InputItem>
                    {
                        user.type==='author' ? <List renderHeader={() => <Badge dot>作者相关</Badge>}>
                            <InputItem
                                clear
                                editable
                                onChange={v=>this.props.handleChange('publish',v)}
                                placeholder='发表'
                                defaultValue={user.publish}
                            >发表</InputItem>
                            <InputItem
                                clear
                                editable
                                onChange={v=>this.props.handleChange('bank',v)}
                                placeholder='提现卡银行'
                                defaultValue={user.bank}
                            >提现卡银行</InputItem>
                            <InputItem
                                clear
                                onChange={v=>this.props.handleChange('bankuser',v)}
                                placeholder='提现卡用户名'
                                defaultValue={user.bankuser}
                            >提现卡用户名</InputItem>
                            <InputItem
                                clear
                                editable
                                type="bankCard"
                                onChange={v=>this.props.handleChange('bankcard',v)}
                                placeholder='提现卡卡号'
                                defaultValue={user.bankcard}
                            >提现卡卡号</InputItem>
                        </List> : null
                    }
                </List>
                <List renderHeader={() => '账号关联'}>
                    <InputItem
                        onChange={v=>this.props.handleChange('wxtoken',v)}
                        placeholder='微信号'
                        defaultValue={user.wxtoken}
                        disabled
                    >微信号</InputItem>
                    <InputItem
                        clear
                        editable
                        onChange={v=>this.props.handleChange('email',v)}
                        placeholder='邮箱'
                        defaultValue={user.email}
                    >邮箱</InputItem>
                </List>
                {/* <List renderHeader={() => <Badge dot>小札推荐奖励政策</Badge>}>
                    <Item></Item>
                </List> */}
                <WhiteSpace size='md' />
                <WingBlank>
                    <Button onClick={this.handleSave} type='primary'>保存</Button>
                </WingBlank>
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
            </div>
        )
    }
}

export default Profile
