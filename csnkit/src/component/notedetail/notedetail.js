import React from 'react'
import {
    Modal,
    Toast,
    Card,
    List,
    Icon,
    Button,
    WhiteSpace
} from 'antd-mobile'
import {
    connect
} from 'react-redux'
import {
    getNote,
    getChapterList,
    getBlinks,
    getBuyers
} from '../../redux/notedetail.redux'
import * as formatContent from '../../util/util'
import moment from 'moment'
import checkImg from './check.png'
import userImg from '../user/user.png'

const getWbContent = (content) => {
    return <div dangerouslySetInnerHTML={formatContent.createMarkup(content)}/>
}

@connect(
    state => state.notedetail, {
        getNote,
        getChapterList,
        getBlinks,
        getBuyers
    }
)
class Notedetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buyerModel: false,
        }
    }

    componentDidMount() {
        this.props.getNote(this.props.match.params.note)
        this.props.getChapterList(this.props.match.params.note)
        this.props.getBlinks(this.props.match.params.note)
        this.props.getBuyers(this.props.match.params.note)

        setTimeout(() => {
            Toast.hide()
        }, 3000)
    }

    componentWillUnmount() {}

    handleClick(v) {
        this.props.history.push(`/chapter/${v._id}`)
    }

    onShowModal = key => (e) => {
        e.preventDefault()
        this.setState({
            [key]: true
        })
    }

    onCloseModal = key => () => {
        this.setState({
            [key]: false
        })
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        const Footer = Card.Footer
        const Item = List.Item
        const Brief = List.Item.Brief
        const note = this.props.note
        const chapters = this.props.chapters
        const blinks = this.props.blinks
        const buyers = this.props.buyers
        const cover = note.coverId
        const author = note.userId

        return (
            <div id='detail-page'>
                <Modal
                    popup
                    title={'购买列表'}
                    visible={this.state.buyerModel}
                    transparent={true}
                    maskClosable={true}
                    closable={true}
                    onClose={this.onCloseModal('buyerModel')}
                    animationType='fade'
                >
                    <div style={{ height: 'auto', overflow: 'scroll' }}>
                        <List>
                            {
                                buyers && buyers.length > 0 ? buyers.map(v=>{
                                    return (
                                        <Item
                                            key={v._id}
                                            thumb={<img src={v.userId.avatar? v.userId.avatar.uri : userImg} alt={v.userId.user} />}
                                        >
                                            {v.userId.user}
                                        </Item>
                                    )
                                }) : null
                            }
                        </List>
                    </div>
                </Modal>
                <Card full>
                    <Header
                        title={note.title}
                        thumb={<Icon type='check' />}
                    ></Header>
                    <Body>
                        <List>
                            <Item
                                thumb={cover ? cover.image.uri : ''}
                                multipleLine
                            >
                                {note.summary}
                                <Brief>
                                    <img src={author ? author.avatar ? author.avatar.uri : userImg : ''} alt='' />
                                    <span>{author ? author.realname : ''}</span>
                                </Brief>
                            </Item>
                        </List>
                    </Body>
                    <Footer
                        content={<div><img src={checkImg} alt='Check' /><span>&nbsp;{note.saleout}人已购买</span></div>}
                        extra={<div>
                            {
                                buyers && buyers.length > 0 ? buyers.map(v=>{
                                    return <img key={v._id} src={v.userId.avatar? v.userId.avatar.uri : userImg} alt={v.userId.user} />
                                }) : null
                            }
                        </div>}
                        onClick={buyers && buyers.length > 0 ? this.onShowModal('buyerModel') : null}
                    ></Footer>
                </Card>

                <List>
                    <Item style={{zIndex: 28}}>
                        <Button onClick={() => {}} type='primary'>继续上传阅读</Button>
                    </Item>
                </List>

                <List
                    renderHeader={() => '小札内容'}
                >
                    {chapters.map(v=>{
                        return (
                            <Item
                                style={{zIndex: 28}}
                                key={v._id}
                                onClick={() => this.handleClick(v)}
                            >{v.title}</Item>
                        )
                    })}
                </List>

                <List
                    renderHeader={() => '小札简介'}
                >
                    <Item>
                        {getWbContent(note.desc)}
                    </Item>
                </List>

                <List
                    renderHeader={() => '作者介绍'}
                >
                    <Item>
                        {author ? getWbContent(author.desc) : ''}
                    </Item>
                </List>

                <List
                    renderHeader={() => '名人推荐'}
                >
                    <Item>
                        {''}
                    </Item>
                </List>

                <List
                    renderHeader={() => '你会学到什么？'}
                >
                    <Item>
                        {getWbContent(note.learnfrom)}
                    </Item>
                </List>

                <List
                    renderHeader={() => '适宜人群'}
                >
                    <Item>
                        {getWbContent(note.suitable)}
                    </Item>
                </List>

                <List
                    renderHeader={() => '更新记录'}
                >
                    <Item>
                        {
                            note.changelog ? note.changelog : ''
                        }
                    </Item>
                </List>

                <List
                    renderHeader={() => '购买须知'}
                >
                    <Item>
                        {getWbContent(note.buyknow)}
                    </Item>
                </List>

                <List
                    renderHeader={() => '精彩评论'}
                >
                    {blinks ? blinks.map(v=>{
                        return (
                            <Item
                                key={v._id}
                            >
                                <Card>
                                    <Header
                                        title={v.userId.user}
                                        thumb={v.userId.avatar ? v.userId.avatar.uri : userImg}
                                        thumbStyle={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '10px',
                                            verticalAlign: 'middle'
                                        }}
                                        extra={<span style={{fontSize: '10px'}}>{moment(v.creatime).format('MM月DD日')}</span>}
                                    />
                                    <Body>
                                        <div>{v.comment}</div>
                                    </Body>
                                </Card>
                            </Item>
                        )
                    }) : null}
                </List>
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
            </div>
        )
    }
}

export default Notedetail
