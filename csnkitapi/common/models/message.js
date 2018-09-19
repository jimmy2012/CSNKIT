'use strict';

module.exports = function(Message) {
    Message.beforeRemote('create', function(context, message, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};