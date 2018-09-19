'use strict';

var app = require('../../server/server');
var utils = require('utility');

function rndNum(n) {
  let rnd = '';
  for (let i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}

function md5Pwd(passwd) {
  const salt = 'jimmy_wong_87eI9wVd65!kjhx';
  return utils.md5(utils.md5(passwd + salt));
}

module.exports = function(User) {
  User.beforeRemote('create', function(context, user, next) {
    context.args.data.creatime = Date.now();
    next();
  });

  User.register = function(userJson, cb) {
    const {user, passwd} = userJson;
    User.findOne({where: {user: user}}, function(err, doc) {
      if (doc !== null) {
        cb({code: 1, msg: '用户名重复'}, {});
      } else {
        const userModel = new User({user: user, passwd: md5Pwd(passwd)});
        userModel.save(function(e, d) {
          if (e) {
            cb({code: 1, msg: '后端出错了'}, {});
          }
          const {user, mobile, _id} = d;
          // res.cookie('userid', _id)
          cb({code: 0, data: {user, mobile, _id}}, {});
        });
      }
    });
  };

  User.remoteMethod('register', {
    accepts: [{
      arg: 'user',
      type: 'object',
      http: {
        source: 'body',
      },
    }],
    returns: {
      type: 'string',
      root: true,
    },
    http: {
      path: '/register',
      verb: 'post',
    },
  });
};
