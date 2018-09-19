const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const models = require('../model')
const Note = models.getModel('note')
const Chapter = models.getModel('chapter')
const User  = models.getModel('user')
const Txlog = models.getModel('txlog')
const Message = models.getModel('message')
const Comment = models.getModel('comment')

Router.get('/purchased', function(req, res) {
    const userid = req.cookies.userid
    Txlog.find({userId: mongoose.Types.ObjectId(userid)},function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }

        let noteIds = []
        if (doc) {
            for (const i in doc) {
                let tx = doc[i]
                let tx_info = tx.toJSON()
                noteIds.push(mongoose.Types.ObjectId(tx_info.noteId).toString())
            }
        }

        if (!noteIds || noteIds.length === 0) {
            return res.json({code:0, data:[]})
        } else {
            Note.find({_id:{$in:noteIds}}, function(en, dn) {
                if (en) {
                    return res.json({code:1, msg: '后端出错了'})
                }
                return res.json({code:0, data:dn})
            }).populate({
                path: 'userId',
                select: '_id user avatar realname mobile desc',
                model: 'user'
            }).populate({
                path: 'coverId',
                select: '_id title desc image creatime',
                model: 'cover'
            }).populate({
                path: 'chapterId',
                select: '_id title text sort creatime',
                model: 'chapter'
            })
        }
    })
})
// INDEX
// GET /list
Router.get('/list', function(req, res) {
    Note.find({onshelf: true}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        return res.json({code:0, data:doc})
    }).populate({
        path: 'userId',
        select: '_id user avatar realname mobile desc',
        model: 'user'
    }).populate({
        path: 'coverId',
        select: '_id title desc image creatime',
        model: 'cover'
    }).populate({
        path: 'noteId',
        select: '_id title text sort creatime',
        model: 'chapter'
    })
})

// GET /getmsgs/:id
Router.get('/getmsgs/:id', function(req, res) {
    const chapterid = req.params.id
    if (!chapterid) {
        return json.dumps({code:1})
    }
    Message.find({chapterId: mongoose.Types.ObjectId(chapterid)}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        return res.json({code:0, data:doc})
    }).populate({
        path: 'userId',
        select: '_id user avatar realname mobile desc',
        model: 'user'
    })
})

// GET /getcomments/:id
Router.get('/getcomments/:id', function(req, res) {
    const messageId = req.params.id
    if (!messageId) {
        return json.dumps({code:1})
    }
    Comment.find({messageId: mongoose.Types.ObjectId(messageId)}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        return res.json({code:0, data:doc})
    }).populate({
        path: 'userId',
        select: '_id user avatar realname mobile desc',
        model: 'user'
    })
})

// GET /getblinks/:id
Router.get('/getblinks/:id', function(req, res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }

    Chapter.find({noteId: mongoose.Types.ObjectId(noteid)}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }

        let chapterIds = []
        if (doc) {
            for (const i in doc) {
                let chapter = doc[i]
                let chapter_info = chapter.toJSON()
                chapterIds.push(mongoose.Types.ObjectId(chapter_info._id))
            }
        }

        if (!chapterIds || chapterIds.length === 0) {
            return res.json({code:0, data:[]})
        } else {
            Message.find({chapterId:{$in:chapterIds}}, function(em, dm) {
                if (em) {
                    return res.json({code:1, msg: '后端出错了'})
                }

                let msgIds = []
                if (dm) {
                    for (const i in dm) {
                        let msg = dm[i]
                        let msg_info = msg.toJSON()
                        msgIds.push(mongoose.Types.ObjectId(msg_info._id))
                    }
                }

                if (!msgIds || msgIds.length === 0) {
                    return res.json({code:0, data:[]})
                } else {
                    Comment.find({messageId:{$in:msgIds}, blink: true}, function(ec, dc) {
                        if (ec) {
                            return res.json({code:1, msg: '后端出错了'})
                        }
                        return res.json({code:0, data:dc})
                    }).populate({
                        path: 'userId',
                        select: '_id user avatar',
                        model: 'user'
                    })
                }
            })
        }
    })
})

// GET /getbuyers/:id
Router.get('/getbuyers/:id', function(req, res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }
    Txlog.find({noteId: mongoose.Types.ObjectId(noteid)},function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        return res.json({code:0, data:doc})
    }).populate({
        path: 'userId',
        select: '_id user avatar',
        model: 'user'
    })
})

// GET /getchapters/:id
Router.get('/getchapters/:id', function(req, res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }
    Chapter.find({noteId: mongoose.Types.ObjectId(noteid)}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        return res.json({code:0, data:doc})
    })
})

// CREATE
// POST /message
Router.post('/message', function(req, res) {
    const {user, chapterId, message} = req.body
    const msgModel = new Message({
        message: message,
        userId: user._id,
        chapterId: mongoose.Types.ObjectId(chapterId),
        creatime: new Date()
    })
    msgModel.save(function(em,dm) {
        if (em) {
            return res.json({code:1, msg: '后端出错了'})
        }

        if (dm._id) {
            Chapter.findByIdAndUpdate(
                chapterId,
                { $push: { messages: msgModel._id } }, function(err, doc){
                if (err) {
                    return res.json({code:1, msg: '后端出错了'})
                }

                const newMsg = JSON.parse(JSON.stringify(msgModel))
                newMsg.userId = user

                return res.json({code:0, data: newMsg})
            })
        }
    })
})

// CREATE
// POST /comment
Router.post('/comment', function(req, res) {
    const {user, messageId, comment} = req.body
    const cmtModel = new Comment({
        comment: comment,
        userId: user._id,
        messageId: mongoose.Types.ObjectId(messageId),
        creatime: new Date()
    })
    cmtModel.save(function(ec,dc) {
        if (ec) {
            return res.json({code:1, msg: '后端出错了'})
        }

        if (dc._id) {
            Message.findByIdAndUpdate(
                messageId,
                { $push: { comments: cmtModel._id } }, function(err, doc){
                if (err) {
                    return res.json({code:1, msg: '后端出错了'})
                }

                const newCmt = JSON.parse(JSON.stringify(cmtModel))
                newCmt.userId = user

                console.log(newCmt)

                return res.json({code:0, data: newCmt})
            })
        }
    })
})

// SHOW
// GET /get/:id
Router.get('/get/:id', function(req, res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }
    Note.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
    })
})
// DELETE /delete/:id
Router.delete('/delete/:id', function(req, res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }
    Note.findByIdAndRemove(noteid, function(err, doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
      })
})
// UPDATE
// PUT /update/:id
Router.put('/update/:id', function(req,res) {
    const noteid = req.params.id
    if (!noteid) {
        return json.dumps({code:1})
    }
    const body = req.body
    Note.findByIdAndUpdate(noteid,body,function(err,doc) {
        if (err) {
            return res.json({code:1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code:0,doc})
        }
    })
})
// CREATE
// POST /add
Router.post('/add', function(req, res) {
    const {name} = req.body
    Note.findOne({name: name}, function(err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '菜单名重复'})
        }
        const noteModel = new Note(req.body)
        noteModel.save(function(e,d) {
            if (e) {
                return res.json({code:1, msg: '后端出错了'})
            }
            return res.json({code:0, data:d})
        })
    })
})

module.exports = Router
