'use strict';

module.exports = function(Cover) {
    Cover.beforeRemote('create', function(context, cover, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};