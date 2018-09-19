import React from 'react'
import { Toast, TextareaItem, List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUser, update } from '../../redux/user.redux'
import commForm from '../comm-form/comm-form'

@connect(
    state=>state,
    {getUser, update}
)
@commForm
class Author extends React.Component {
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        this.props.update(this.props.state)
        Toast.success('申请成功，请等待平台审核!', 1)
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
            <div id='author-page'>
                <List renderHeader={() => '申请成为作者'}>
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                        placeholder='用户名'
                        disabled
                        defaultValue={user.user}
                    >用户名</InputItem>
                    <InputItem
                        onChange={v=>this.props.handleChange('realname',v)}
                        placeholder='真实姓名'
                        disabled
                        defaultValue={user.realname}
                    >真实姓名</InputItem>
                    <TextareaItem
                        clear
                        title='申请理由'
                        autoHeight
                        editable
                        rows={5}
                        placeholder='请填写你为什么想成为本平台作者的理由'
                        onChange={v=>this.props.handleChange('apply',v)}
                    />
                </List>
                <WhiteSpace size='md' />
                <WingBlank>
                    <Button onClick={this.handleSave} type='primary'>保存</Button>
                </WingBlank>
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
            </div>
        )
    }
}

export default Author
