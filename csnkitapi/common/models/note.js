'use strict';

module.exports = function(Note) {
    Note.beforeRemote('create', function(context, note, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};