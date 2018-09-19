import React from 'react'
import { Modal, Toast, List, Card, Button, TextareaItem, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { getChapter, getMsgs, addMsg, getComments, addComment } from '../../redux/notedetail.redux'
import * as formatContent from '../../util/util'
import moment from 'moment'
import commentImg from './comment.png'

const getWbContent = (content) => {
    return <div dangerouslySetInnerHTML={formatContent.createMarkup(content)}/>
}

@connect(
    state=>state.notedetail,
    {getChapter, getMsgs, addMsg, getComments, addComment}
)
class Chapter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            curmsgId: '',
            newcmt: '',
            comment: false,
            curcomments: {}
        }
    }

    componentDidMount() {
        this.props.getChapter(this.props.match.params.chapter)
        this.props.getMsgs(this.props.match.params.chapter)

        setTimeout(() => {
            Toast.hide()
        }, 3000)
    }

    componentWillUnmount() {
    }

    handleAddComment(messageId) {
        const cmt = this.state.newcmt
        if (cmt.replace(/(^\s*)|(\s*$)/g, '').length ===0) {
            Toast.fail('评论不能为空', 1)
        } else {
            this.setState({
                newcmt: ''
            })
            this.props.addComment(messageId, cmt)
        }
    }

    handleAddMsg(chapterId) {
        const msg = this.state.message
        if (msg.replace(/(^\s*)|(\s*$)/g, '').length ===0) {
            Toast.fail('留言信息不能为空', 1)
        } else {
            this.setState({
                message: ''
            })
            this.props.addMsg(chapterId, msg)
        }
    }

    onShowModal = (key, msg) => (e) => {
        this.props.getComments(msg._id)
        e.preventDefault()
        this.setState({
            [key]: true,
            curmsgId: msg._id,
            curcomments: this.props.comments
        })
    }

    onCloseModal = key => () => {
        this.setState({
            [key]: false,
            curmsgId: '',
            curcomments: {}
        })
    }

    render() {
        const Item = List.Item
        const Header = Card.Header
        const Body = Card.Body
        const Footer = Card.Footer
        const chapter = this.props.chapter
        const msgs = this.props.msgs
        const curmsgId = this.state.curmsgId
        const curcomments = this.state.curcomments
        return (
            <div id='chapter-page'>
                <Modal
                    popup
                    title={'评 论'}
                    visible={this.state.comment}
                    transparent={true}
                    maskClosable={true}
                    closable={true}
                    onClose={this.onCloseModal('comment')}
                    animationType='fade'
                >
                    <div style={{ height: 'auto', overflow: 'scroll' }}>
                        <List>
                            <TextareaItem
                                clear
                                title='评论'
                                autoHeight
                                editable
                                rows={2}
                                placeholder='评论将在后台进行审核，审核通过后对所有人可见'
                                onChange={v=>{this.setState({newcmt:v})}}
                            />
                            <Item style={{zIndex: 29}}>
                                <Button size='small' onClick={() => this.handleAddComment(curmsgId)} type='primary'>评论</Button>
                            </Item>
                        </List>
                        <WhiteSpace size='xs' />
                        <List>
                            {
                                curcomments && curcomments.length > 0 ? curcomments.map(v=>{
                                    return (
                                        <Card key={v._id}>
                                            <Header
                                                title={v.userId.user}
                                                thumb={v.userId.avatar.uri}
                                                thumbStyle={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '10px',
                                                    verticalAlign: 'middle'
                                                }}
                                                extra={<span style={{fontSize: '10px'}}>{moment(v.creatime).format('MM-DD HH:mm')}</span>}
                                            />
                                            <Body>
                                                <div>{getWbContent(formatContent.convertHTML(v.comment))}</div>
                                            </Body>
                                        </Card>
                                    )
                                }) : null
                            }
                        </List>
                    </div>
                </Modal>
                <List
                    renderHeader={() => chapter.title}
                    // renderFooter={() => moment(chapter.creatime).format('YYYY-MM-DD HH:mm')}
                >
                    <Item>
                        {getWbContent(chapter.text)}
                    </Item>
                </List>
                <WhiteSpace size='xs' />
                <List>
                    <TextareaItem
                        clear
                        title='用户留言'
                        autoHeight
                        editable
                        rows={3}
                        placeholder='留言将在后台进行审核，审核通过后对所有人可见'
                        onChange={v=>{this.setState({message:v})}}
                    />
                    <Item style={{zIndex: 28}}>
                        <Button onClick={() => this.handleAddMsg(chapter._id)} type='primary'>留言</Button>
                    </Item>
                </List>
                <WhiteSpace size='xs' />
                <List>
                    {msgs.map(v=>{
                        return (
                            <Item
                                key={v._id}
                            >
                                <Card>
                                    <Header
                                        title={v.userId.user}
                                        thumb={v.userId.avatar.uri}
                                        thumbStyle={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '10px',
                                            verticalAlign: 'middle'
                                        }}
                                        extra={<span style={{fontSize: '10px'}}>{moment(v.creatime).format('MM-DD HH:mm')}</span>}
                                    />
                                    <Body>
                                        <div>{getWbContent(formatContent.convertHTML(v.message))}</div>
                                    </Body>
                                    <Footer
                                        style={{zIndex: 88}}
                                        content={
                                            <div
                                                onClick={this.onShowModal('comment', v)}
                                            >
                                                <img src={commentImg} alt='comment' />
                                                {v.comments && v.comments.length > 0 ? v.comments.length + '条' : ''} 评论
                                            </div>
                                        }
                                    ></Footer>
                                </Card>
                            </Item>
                        )
                    })}
                </List>
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
            </div>
        )
    }
}

export default Chapter
