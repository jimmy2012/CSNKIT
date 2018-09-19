const express = require('express')
const utils = require('utility')

const Router = express.Router()
const models = require('../model')
const User  = models.getModel('user')
const Note = models.getModel('note')
const _filter = {'passwd': 0, '__v': 0}

Router.get('/list', function(req, res) {
    const { type } = req.query
    // User.remove({}, function(e,d) {

    // })
    User.find({type}, _filter, function(err, doc) {
        return res.json({code:0, data:doc})
    })
})
Router.post('/mobile', function(req,res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code:1, msg: '用户未登录'})
    }
    const { code } = req.body
    const cookie_code = req.cookies.code
    if (cookie_code !== md5Pwd(code)) {
        return res.json({code:1, msg: '验证码不正确'})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            mobile:doc.mobile
        },body)
        return res.json({code:0,data})
    })
})
Router.post('/sendcode', function(req,res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code:1, msg: '用户未登录'})
    }
    let code = rndNum(6)
    console.log('code[' + code + ']')
    res.cookie('code', md5Pwd(code))
    return res.json({code:0,data:{code:md5Pwd(code)}})
})
Router.post('/login', function(req,res) {
    const { user, passwd } = req.body
    User.findOne({user, passwd: md5Pwd(passwd)}, _filter, function(err, doc) {
        if (!doc) {
            return res.json({code:1, msg: '用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code:0, data:doc})
    })
})
Router.post('/register', function(req, res) {
    console.log(req.body)
    const {user, passwd} = req.body
    User.findOne({user: user}, function(err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, passwd:md5Pwd(passwd)})
        userModel.save(function(e,d) {
            if (e) {
                return res.json({code:1, msg: '后端出错了'})
            }
            const {user, mobile, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0, data:{user, mobile, _id}})
        })
    })
})
Router.get('/info', function(req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function(err,doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
    })
})
Router.post('/update', function(req,res) {
    const { userid } = req.cookies
    if (!userid) {
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, {new: true}, function(err,doc) {
        return res.json({code:0,data:doc})
    })
})

function rndNum(n) {
    let rnd = ""
    for(let i=0; i<n; i++)
        rnd += Math.floor(Math.random()*10)
    return rnd
}

function md5Pwd(passwd) {
    const salt = 'jimmy_wong_87eI9wVd65!kjhx'
    return utils.md5(utils.md5(passwd+salt))
}

module.exports = Router
