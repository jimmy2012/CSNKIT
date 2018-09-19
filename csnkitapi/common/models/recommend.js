'use strict';

module.exports = function(Recommend) {
    Recommend.beforeRemote('create', function(context, recommend, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};