import axios from 'axios'
import { getRedirectPath } from '../util/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            }
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            }
        case LOGOUT:
            return {
                ...initState,
                redirectTo: '/login'
            }
        default:
            return state
    }
}

function authSuccess(obj) {
    const { passwd, ...data } = obj
    return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}

export function logoutSubmit() {
    return { type: LOGOUT }
}

export function update(data) {
    return async (dispatch)=>{
        const res = await axios.post('/user/update', data)
        if (res.status===200 && res.data.code===0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function mobile({mobile, code}) {
    mobile = mobile.replace(/\s*/g, '')
    code = code.replace(/\s*/g, '')

    if (!mobile || mobile.length !== 11) {
        return errorMsg('手机号码不正确')
    }
    if (!code) {
        return errorMsg('验证码不能为空')
    } else {
        return async (dispatch)=>{
            const res = await axios.post('/user/mobile', {mobile, code})
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }
    }
}

export function sendcode({mobile}) {
    mobile = mobile.replace(/\s*/g, '')
    if (!mobile || mobile.length !== 11) {
        return errorMsg('手机号码不正确')
    }
    return async (dispatch)=>{
        const res = await axios.post('/user/sendcode', {mobile})
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function login({user, passwd}) {
    if (!user) {
        return errorMsg('用户名必须输入')
    }
    if (!passwd) {
        return errorMsg('用户密码必须输入')
    }
    return async (dispatch)=>{
        const res = await axios.post('/user/login', {user, passwd})
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function register({user, passwd, repeatepwd}) {
    if (!user) {
        return errorMsg('用户名必须输入')
    }
    if (!passwd) {
        return errorMsg('用户密码必须输入')
    }
    if (!repeatepwd) {
        return errorMsg('用户确认密码必须输入')
    }
    if (passwd !== repeatepwd) {
        return errorMsg('用户密码和确认密码不同')
    }
    return async (dispatch)=>{
        const res = await axios.post('/user/register', {user, passwd})
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess({user, passwd}))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function getUser() {
    return async (dispatch, getState)=>{
        dispatch(loadData(getState().user))
    }
}
