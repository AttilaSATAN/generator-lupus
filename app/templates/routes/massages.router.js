'use strict';
var route = require('koa-route'),
    messages = require('../controllers/messages') ;

module.exports = function(app){
    app.use(route.get('/', messages.home));
    app.use(route.get('/messages', messages.list));
    app.use(route.get('/messages/:id', messages.fetch));
    app.use(route.post('/messages', messages.create));
};
