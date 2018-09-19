import React from 'react'
import {
  Admin,
  Resource,
  Delete
} from 'admin-on-rest'
import loopbackRestClient from 'aor-loopback'

import UserIcon from 'material-ui/svg-icons/social/group'
import NoteIcon from 'material-ui/svg-icons/action/book'
import RecommendIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import ChapterIcon from 'material-ui/svg-icons/content/archive'
import MessageIcon from 'material-ui/svg-icons/communication/message'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import TxlogIcon from 'material-ui/svg-icons/places/business-center'
import BannerIcon from 'material-ui/svg-icons/social/public'
import GuideIcon from 'material-ui/svg-icons/action/help'
import TagIcon from 'material-ui/svg-icons/toggle/star-border'
import CoverIcon from 'material-ui/svg-icons/action/bookmark'

import {
  UserList,
  UserShow,
  UserEdit,
  UserCreate
} from './users'
import {
  NoteList,
  NoteShow,
  NoteEdit,
  NoteCreate
} from './notes'
import {
  RecommendList,
  RecommendEdit,
  RecommendCreate
} from './recommends'
import {
  ChapterList,
  ChapterShow,
  ChapterEdit,
  ChapterCreate
} from './chapters'
import {
  MessageList,
  MessageShow,
  MessageEdit,
  MessageCreate
} from './messages'
import {
  CommentList,
  CommentEdit,
  CommentCreate
} from './comments'
import {
  TxlogList,
  TxlogShow,
  TxlogEdit,
  TxlogCreate
} from './txlogs'
import {
  BannerList,
  BannerShow,
  BannerEdit,
  BannerCreate
} from './banners'
import {
  GuideList,
  GuideShow,
  GuideEdit,
  GuideCreate
} from './guides'
import {
  TagList,
  TagShow,
  TagEdit,
  TagCreate
} from './tags'
import {
  CoverList,
  CoverEdit,
  CoverCreate,
  CoverShow
} from './covers'

import {
  Dashboard
} from './components'

// import Dashboard from './Dashboard'
import authClient from './authClient'

import addUploadCapabilities from "./addUploadCapabilities"

import chineseMessages from 'aor-language-chinese'

const messages = {
  cn: chineseMessages
}

const restClient = loopbackRestClient('http://localhost:4000/api');
const restCapableClient = addUploadCapabilities(restClient);

const App = () => (
  <Admin title="鲤鱼商学平台后台管理系统" locale='cn' messages={messages} authClient={authClient} dashboard={Dashboard} restClient={restCapableClient}>
    <Resource name='users' options={{ label: '用户管理' }} list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
    <Resource name='notes' options={{ label: '小札管理' }} list={NoteList} show={NoteShow} edit={NoteEdit} create={NoteCreate} remove={Delete} icon={NoteIcon} />
    <Resource name='recommends' options={{ label: '推荐管理' }} list={RecommendList} edit={RecommendEdit} create={RecommendCreate} remove={Delete} icon={RecommendIcon} />
    <Resource name='chapters' options={{ label: '章节管理' }} list={ChapterList} show={ChapterShow} edit={ChapterEdit} create={ChapterCreate} remove={Delete} icon={ChapterIcon} />
    <Resource name='messages' options={{ label: '留言管理' }} list={MessageList} show={MessageShow} edit={MessageEdit} create={MessageCreate} remove={Delete} icon={MessageIcon} />
    <Resource name='comments' options={{ label: '评论管理' }} list={CommentList} edit={CommentEdit} create={CommentCreate} remove={Delete} icon={CommentIcon} />
    <Resource name='txlogs' options={{ label: '交易管理' }} list={TxlogList} show={TxlogShow} edit={TxlogEdit} create={TxlogCreate} remove={Delete} icon={TxlogIcon} />
    <Resource name='banners' options={{ label: '广告管理' }} list={BannerList} show={BannerShow} edit={BannerEdit} create={BannerCreate} remove={Delete} icon={BannerIcon} />
    <Resource name='guides' options={{ label: '帮助管理' }} list={GuideList} show={GuideShow} edit={GuideEdit} create={GuideCreate} remove={Delete} icon={GuideIcon} />
    <Resource name='tags' options={{ label: '标签管理' }} list={TagList} show={TagShow} edit={TagEdit} create={TagCreate} remove={Delete} icon={TagIcon} />
    <Resource name='covers' options={{ label: '封面管理' }} list={CoverList} show={CoverShow} edit={CoverEdit} create={CoverCreate} remove={Delete} icon={CoverIcon} />
  </Admin>
)

export default App