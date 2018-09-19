'use strict';

module.exports = function(Guide) {
    Guide.beforeRemote('create', function(context, guide, next) {
        console.log(context.args.data.tag_ids);
        context.args.data.creatime = Date.now();
        next();
    });
};