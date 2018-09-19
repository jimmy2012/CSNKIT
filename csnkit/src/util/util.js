
export function getRedirectPath({mobile}) {
    let url = '/note'
    if (!mobile) {
        url = '/mobile'
    }

    return url
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_')
}

export function timestampToDay(timestamp) {
    // console.log(timestampToTime(1403058804))   2014-06-18
    let date = new Date(timestamp)   //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let D = date.getDate() + ' '
    return Y + M + D
}

export function timestampToTimeMinute(timestamp) {
    // console.log(timestampToTime(1403058804))   2014-06-18 10:33
    let date = new Date(timestamp)   //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes()
    return Y + M + D + h + m
}

export function timestampToTimeSecond(timestamp) {
    // console.log(timestampToTime(1403058804))   2014-06-18 10:33:24
    let date = new Date(timestamp)   //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s
}

export function createMarkup(text) {
    return {__html: getWbContent(text)}
}

export const getWbContent = (content) => {
    /*
     *
     *一些标签替换等操作
     *
     */
    let contentHTML = content

    return contentHTML
}

export function convertHTML(text) {
    if (text) {
        let i, c, result = ''
        for (i = 0; i < text.length; i++) {
            c = text.substr(i, 1)
            if ( c === '\n')
                result = result + '</br>'
            else if (c !== '\r')
                result = result + c
        }

        return result
    } else {
        return text
    }
}
