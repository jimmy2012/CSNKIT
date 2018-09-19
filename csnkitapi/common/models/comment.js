'use strict';

module.exports = function(Comment) {
    Comment.beforeRemote('create', function(context, comment, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};