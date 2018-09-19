import axios from 'axios'

const NOTE_BOOK = 'NOTE_BOOK'
const CHAPTER_LIST = 'CHAPTER_LIST'
const COMMENT_BLINKS = 'COMMENT_BLINKS'
const CHAPTER_DETAIL = 'CHAPTER_DETAIL'
const CHAPTER_MSGS = 'CHAPTER_MSGS'
const NEW_MSG = 'NEW_MSG'
const NOTE_BUYERS = 'NOTE_BUYERS'
const MSG_COMMENTS = 'MSG_COMMENTS'
const NEW_COMMENT = 'NEW_COMMENT'

const ERROR_MSG = 'ERROR_MSG'

const initState = {
    note: {},
    chapters: [],
    blinks: [],
    chapter: {},
    msgs: [],
    buyers: [],
    comments: []
}

export function notedetail(state = initState, action) {
    switch (action.type) {
        case NOTE_BOOK:
            return {
                ...state,
                note:action.payload
            }
        case CHAPTER_LIST:
            return {
                ...state,
                chapters:action.payload
            }
        case COMMENT_BLINKS:
            return {
                ...state,
                blinks:action.payload
            }
        case CHAPTER_DETAIL:
            return {
                ...state,
                chapter:action.payload
            }
        case CHAPTER_MSGS:
            return {
                ...state,
                msgs:action.payload
            }
        case NEW_MSG:
            return {
                ...state,
                msgs:[...state.msgs, action.payload]
            }
        case NOTE_BUYERS:
            return {
                ...state,
                buyers:action.payload
            }
        case MSG_COMMENTS:
            return {
                ...state,
                comments:action.payload
            }
        case NEW_COMMENT:
            return {
                ...state,
                comments:[...state.comments, action.payload]
            }
        default:
            return state
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

function noteDetail(data) {
    return { type: NOTE_BOOK, payload: data }
}

function chapterList(data) {
    return { type: CHAPTER_LIST, payload: data }
}

function blinkList(data) {
    return { type: COMMENT_BLINKS, payload: data }
}

function chapterDetail(data) {
    return { type: CHAPTER_DETAIL, payload: data }
}

function msgList(data) {
    return { type: CHAPTER_MSGS, payload: data }
}

function buyerList(data) {
    return { type: NOTE_BUYERS, payload: data }
}

function newMsg(data) {
    return { type: NEW_MSG, payload: data }
}

function commentList(data) {
    return { type: MSG_COMMENTS, payload: data }
}

function newComment(data) {
    return { type: NEW_COMMENT, payload: data }
}

export function getNote(noteId) {
    if (!noteId) {
        return errorMsg('小札ID欠缺')
    }

    return async (dispatch, getState)=>{
        let cNote, notes = getState().note.noteList
        for(const i in notes) {
            let note = notes[i]
            if (note._id === noteId)  cNote = note
        }
        if (cNote)
            dispatch(noteDetail(cNote))
        else
            dispatch(noteDetail(null))
    }
}

export function getChapterList(noteId) {
    if (!noteId) {
        return errorMsg('小札ID欠缺')
    }

    return async (dispatch)=>{
        const res = await axios.get('/note/getchapters/' + noteId)
        if (res.status===200 && res.data.code===0) {
            dispatch(chapterList(res.data.data))
        }
    }
}

export function getBlinks(noteId) {
    if (!noteId) {
        return errorMsg('小札ID欠缺')
    }

    return async (dispatch)=>{
        const res = await axios.get('/note/getblinks/' + noteId)
        if (res.status===200 && res.data.code===0) {
            dispatch(blinkList(res.data.data))
        }
    }
}

export function getChapter(chapterId) {
    if (!chapterId) {
        return errorMsg('小札章节欠缺')
    }

    return async (dispatch, getState)=>{
        let cChapter, chapters = getState().notedetail.chapters
        for(const i in chapters) {
            let chapter = chapters[i]
            if (chapter._id === chapterId)  cChapter = chapter
        }
        if (cChapter)
            dispatch(chapterDetail(cChapter))
        else
            dispatch(chapterDetail(null))
    }
}

export function getMsgs(chapterId) {
    if (!chapterId) {
        return errorMsg('小札章节欠缺')
    }

    return async (dispatch)=>{
        const res = await axios.get('/note/getmsgs/' + chapterId)
        if (res.status===200 && res.data.code===0) {
            dispatch(msgList(res.data.data))
        }
    }
}

export function getBuyers(noteId) {
    if (!noteId) {
        return errorMsg('小札ID欠缺')
    }

    return async (dispatch)=>{
        const res = await axios.get('/note/getbuyers/' + noteId)
        if (res.status===200 && res.data.code===0) {
            dispatch(buyerList(res.data.data))
        }
    }
}

export function addMsg(chapterId, message) {
    if (!chapterId) {
        return errorMsg('未指定当前章节')
    }
    if (!message) {
        return errorMsg('评论不能为空')
    }

    return async (dispatch, getState)=>{
        let user = getState().user
        const res = await axios.post('/note/message', {user, chapterId, message})
        if (res.status === 200 && res.data.code === 0) {
            dispatch(newMsg(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function getComments(messageId) {
    if (!messageId) {
        return errorMsg('留言ID欠缺')
    }

    return async (dispatch)=>{
        const res = await axios.get('/note/getcomments/' + messageId)
        if (res.status===200 && res.data.code===0) {
            dispatch(commentList(res.data.data))
        }
    }
}

export function addComment(messageId, comment) {
    if (!messageId) {
        return errorMsg('未指定当前留言')
    }
    if (!comment) {
        return errorMsg('评论不能为空')
    }

    return async (dispatch, getState)=>{
        let user = getState().user
        const res = await axios.post('/note/comment', {user, messageId, comment})
        if (res.status === 200 && res.data.code === 0) {
            dispatch(newComment(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}
