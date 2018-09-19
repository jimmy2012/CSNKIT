import axios from 'axios'

const NOTE_LIST = 'NOTE_LIST'
const BOUGHT_LIST = 'BOUGHT_LIST'

const initState = {
    sign: 'list',
    noteList: [],
    boughtList: []
}

export function note(state = initState, action) {
    switch (action.type) {
        case NOTE_LIST:
            return {
                ...state,
                noteList: action.payload
            }
        case BOUGHT_LIST:
            return {
                ...state,
                boughtList: action.payload
            }
        default:
            return state
    }
}

function noteList(data) {
    return {
        type: NOTE_LIST,
        payload: data
    }
}

function boughtList(data) {
    return {
        type: BOUGHT_LIST,
        payload: data
    }
}

export function getNoteList() {
    return async (dispatch) => {
        const res = await axios.get('/note/list')
        if (res.status === 200 && res.data.code === 0) {
            dispatch(noteList(res.data.data))
        }
    }
}

export function getMyList() {
    return async (dispatch) => {
        const res = await axios.get('/note/purchased')
        if (res.status === 200 && res.data.code === 0) {
            dispatch(boughtList(res.data.data))
        }
    }
}