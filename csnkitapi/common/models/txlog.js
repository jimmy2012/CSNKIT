'use strict';

module.exports = function(Txlog) {
    Txlog.beforeRemote('create', function(context, txlog, next) {
        context.args.data.creatime = Date.now();
        next();
    });
};