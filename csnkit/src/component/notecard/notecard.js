import React from 'react'
import PropTypes from 'prop-types'
import {
    Toast,
    Card,
    Icon,
    Badge,
    List,
    WhiteSpace
} from 'antd-mobile'
import {
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/user.redux'
// import bookImg from './book32.png'
@connect(
    state=>state,
    {getUser}
)
@withRouter
class NoteCard extends React.Component {

    static propTypes = {
        sign: PropTypes.string.isRequired,
        noteList: PropTypes.array.isRequired,
        boughtList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/ndetail/${v._id}`)
    }

    componentDidMount() {
        this.props.getUser()

        setTimeout(() => {
            Toast.hide()
          }, 3000)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        const Footer = Card.Footer
        const Item = List.Item
        const Brief = List.Item.Brief
        const sign = this.props.sign
        const nList = sign === 'list' ? this.props.noteList : this.props.boughtList
        const user = this.props.user
        return (
            <div style={{ top: '0' }} id='note-page'>
                {(nList === undefined || nList.length === 0 ) ? null :
                    nList.map(v=>(
                    v.coverId ?
                        <div key={v._id}>
                            <Card full>
                            {(sign === 'buy') ?
                                <Header
                                    title={v.title}
                                    thumb={<Icon type='check' />}
                                ></Header> :
                                JSON.stringify(this.props.boughtList).indexOf(JSON.stringify(v))=== -1 ?
                                    (v.userId.user === user.user ?
                                    <Header
                                        title={v.title}
                                        extra={<Badge text={'本人作品'} style={{
                                            marginLeft: 16,
                                            padding: '0 3px',
                                            backgroundColor: '#fff',
                                            borderRadius: 3,
                                            color: '#8a8a8a',
                                            border: '1px solid #8a8a8a' }} />}
                                        thumb={<Icon type='check' />}
                                    ></Header> : <Header
                                    title={v.title}
                                    extra={<Badge text={`¥${v.price}`} style={{ marginLeft: 16 }} />}
                                    thumb={<Icon type='check' />}
                                ></Header>) :
                                    <Header
                                        title={v.title}
                                        extra={<Badge text='已购' style={{
                                            marginLeft: 16,
                                            padding: '0 3px',
                                            backgroundColor: '#fff',
                                            borderRadius: 3,
                                            color: '#8a8a8a',
                                            border: '1px solid #8a8a8a'}} />}
                                        thumb={<Icon type='check' />}
                                    ></Header>
                            }
                                <Body>
                                    <List>
                                        <Item
                                            style={{zIndex: 28, borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}
                                            thumb={v.coverId.image.uri}
                                            multipleLine
                                            onClick={() => this.handleClick(v)}
                                        >
                                            {v.summary}<Brief>作者: {v.userId.user}</Brief>
                                        </Item>
                                    </List>
                                </Body>
                                <Footer
                                    content={`${v.chapters ? v.chapters.length : 0}小节 - ${v.saleout}人已购买`}
                                ></Footer>
                            </Card><WhiteSpace size='xs' />
                        </div> : null
                    ))
                }
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
            </div>
        )
    }
}

export default NoteCard
