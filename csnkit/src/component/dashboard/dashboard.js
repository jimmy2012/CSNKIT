import React from 'react'
import { connect } from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'
import { Route, Switch } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import NavLinkBar from '../navlink/navlink'
import Note from '../note/note'
import Purchased from '../purchased/purchased'
import User from '../user/user'
import Notedetail from '../notedetail/notedetail'
import Chapter from '../chapter/chapter'
import Profile from '../profile/profile'
import Author from '../author/author'

@connect(
    state=>state
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        browserCookie.erase('code')
    }

    render() {
        const {pathname} = this.props.location
        const navList = [
            {
                path: '/note',
                text: '所有小札',
                icon: 'note',
                title: '小札列表',
                toproute: true,
                component: Note
            },
            {
                path: '/purchased',
                text: '已购',
                icon: 'purchased',
                title: '已购列表',
                toproute: true,
                component: Purchased
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                toproute: true,
                component: User
            },
            {
                path: '/ndetail/:note',
                title: '小札详细',
                toproute: false,
                component: Notedetail,
                hide: true
            },
            {
                path: '/chapter/:chapter',
                title: '章节详细',
                toproute: false,
                component: Chapter,
                hide: true
            },
            {
                path: '/profile',
                title: '个人资料',
                toproute: false,
                component: Profile,
                hide: true
            },
            {
                path: '/author',
                title: '申请成为作者',
                toproute: false,
                component: Author,
                hide: true
            }
        ]

        const curr = navList.find(v=>{
            let curp = v.path
            if (curp.indexOf(':') !== -1)
                curp = curp.substring(0, curp.indexOf(':') - 1)
            if (pathname.indexOf(curp) !== -1)
                return v.path
            else
                return null
        })

        const isJson = (typeof(curr) === "object" && Object.prototype.toString.call(curr).toLowerCase() === "[object object]" && !curr.length)

        return (
            <div>
                {
                    isJson && !curr.toproute ?
                    <NavBar
                        className='fixd-header'
                        mode='dard'
                        icon={<Icon type='left' />}
                        onLeftClick={()=>{
                            this.props.history.goBack()
                        }}
                    >
                        {isJson ? curr.title : ''}
                    </NavBar> : <NavBar
                        className='fixd-header'
                        mode='dard'
                    >
                        {isJson ? curr.title : ''}
                    </NavBar>
                }
                <div>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard
