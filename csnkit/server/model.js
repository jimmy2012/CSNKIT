const mongoose = require('mongoose')

// 链接mongo并使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/csnkit'
mongoose.connect(DB_URL, {
    useNewUrlParser: true
})
mongoose.set('debug', true)

const models = {
    banner: {
        'area': {
            'type': String,
            'required': true
        },
        'name': {
            'type': String,
            'required': true
        },
        'image': {
            'type': Object
        },
        'show': {
            'type': Boolean,
            'required': true,
            'default': false
        },
        'url': {
            'type': String
        },
        'start': {
            'type': Date
        },
        'end': {
            'type': Date
        },
        'creatime': {
            'type': Date
        }
    },
    chapter: {
        'messages': [{
            'type': String,
            ref: 'message'
        }],
        'noteId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'note'
        },
        'title': {
            'type': String,
            'required': true
        },
        'text': {
            'type': String
        },
        'sort': {
            'type': Number,
            'required': true,
            'default': 1
        },
        'creatime': {
            'type': Date
        }
    },
    comment: {
        'comment': {
            'type': String
        },
        'messageId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'message'
        },
        'userId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        'blink': {
            'type': Boolean,
            'required': true,
            'default': false
        },
        'creatime': {
            'type': Date
        }
    },
    cover: {
        'title': {
            'type': String,
            'required': true
        },
        'desc': {
            'type': String
        },
        'image': {
            'type': Object
        },
        'creatime': {
            'type': Date
        }
    },
    guide: {
        'tags': [{
            'type': String,
            ref: 'tag'
        }],
        'title': {
            'type': String,
            'required': true
        },
        'summary': {
            'type': String,
            'required': true
        },
        'desc': {
            'type': String
        },
        'image': {
            'type': Object
        },
        'creatime': {
            'type': Date
        }
    },
    message: {
        'message': {
            'type': String
        },
        'auth': {
            'type': Boolean,
            'required': true,
            'default': false
        },
        'comments': [{
            'type': String,
            ref: 'comment'
        }],
        'chapterId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'chapter'
        },
        'userId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        'creatime': {
            'type': Date
        }
    },
    note: {
        'tags': [{
            'type': String,
            ref: 'tag'
        }],
        'title': {
            'type': String,
            'require': true
        },
        'summary': {
            'type': String,
            'require': true
        },
        'price': {
            'type': Number,
            'default': 0.00
        },
        'desc': {
            'type': String
        },
        'learnfrom': {
            'type': String
        },
        'suitable': {
            'type': String
        },
        'recommends': [{
            'type': String,
            ref: 'recommend',
        }],
        'txlogs': [{
            'type': String,
            ref: 'txlog',
        }],
        'buyknow': {
            'type': String
        },
        'ratelogs': {
            'type': [
                Object
            ]
        },
        'collect': {
            'type': Number,
            'default': 0
        },
        'saleout': {
            'type': Number,
            'default': 0
        },
        'changelogs': {
            'type': [
                Object
            ]
        },
        'onshelf': {
            'type': Boolean,
            'default': false
        },
        'userId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        'coverId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'cover'
        },
        'chapters': [{
            'type': String,
            ref: 'chapter',
        }],
        'creatime': {
            'type': Date,
            'default': new Date().getTime()
        }
    },
    recommend: {
        'userId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        'noteId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'note'
        },
        'recommend': {
            'type': String
        },
        'creatime': {
            'type': Date
        }
    },
    tag: {
        'type': {
            'type': String,
            'required': true
        },
        'name': {
            'type': String,
            'required': true
        },
        'creatime': {
            'type': Date
        }
    },
    txlog: {
        'ratelog': {
            'type': String
        },
        'reward': {
            'type': Number,
            'required': true,
            'default': 0
        },
        'txlogsn': {
            'type': String
        },
        'amount': {
            'type': Number,
            'required': true,
            'default': 0
        },
        'type': {
            'type': String,
            'required': true
        },
        'state': {
            'type': Boolean,
            'required': true,
            'default': false
        },
        'userId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        'noteId': {
            'type': mongoose.Schema.Types.ObjectId,
            ref: 'note'
        },
        'tradeno': {
            'type': String
        },
        'creatime': {
            'type': Date
        }
    },
    user: {
        'groom': {
            'type': String
        },
        'viplevel': {
            'type': String
        },
        'user': {
            'type': String,
            'require': true
        },
        'passwd': {
            'type': String,
            'require': true
        },
        'wxtoken': {
            'type': String
        },
        'gender': {
            'type': String
        },
        'realname': {
            'type': String
        },
        'mobile': {
            'type': String
        },
        'email': {
            'type': String
        },
        'avatar': {
            'type': Object
        },
        'job': {
            'type': String
        },
        'position': {
            'type': String
        },
        'company': {
            'type': String
        },
        'desc': {
            'type': String
        },
        'publish': {
            'type': String
        },
        'money': {
            'type': Number,
            'default': 0
        },
        'score': {
            'type': Number,
            'default': 0
        },
        'bank': {
            'type': String
        },
        'bankuser': {
            'type': String
        },
        'bankcard': {
            'type': String
        },
        'reward': {
            'type': Number,
            'default': 0
        },
        'apply': {
            'type': String
        },
        'type': {
            'type': String,
            'default': 'reader'
        },
        'active': {
            'type': Boolean,
            'default': true
        },
        'favs': [{
            'type': String,
            ref: 'note'
        }],
        'creatime': {
            'type': Date,
            'default': new Date().getTime()
        },
        'logintime': {
            'type': Date,
            'default': new Date().getTime()
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]), m)
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}
