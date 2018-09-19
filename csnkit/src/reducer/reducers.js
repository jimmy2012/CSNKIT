// 合并所有reducer并且返回
import { combineReducers } from 'redux'
import { user } from '../redux/user.redux'
import { note } from '../redux/note.redux'
import { notedetail } from '../redux/notedetail.redux'

export default combineReducers({
    user,
    note,
    notedetail
})
