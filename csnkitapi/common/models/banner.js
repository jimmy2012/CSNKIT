'use strict';

module.exports = function(Banner) {
    Banner.beforeRemote('create', function(context, banner, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};