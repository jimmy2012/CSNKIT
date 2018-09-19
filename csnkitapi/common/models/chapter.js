'use strict';

module.exports = function(Chapter) {
    Chapter.beforeRemote('create', function(context, chapter, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};