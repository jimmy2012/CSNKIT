'use strict';

module.exports = function(Tag) {
    Tag.on('dataSourceAttached', function(obj) {
        Tag.beforeRemote('create', function(context, tag, next) {
            context.args.data.creatime = Date.now();
            next();
        });
    });
};