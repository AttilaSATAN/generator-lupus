'use strict';
var
  compress = require('koa-compress'),
  logger = require('koa-logger'),
  serve = require('koa-static'),
  koa = require('koa'),
  path = require('path'),
  config = require('./config'),
  app = module.exports = koa();


config.getGlobbedFiles('./models/**/*.js').forEach(function(modelPath) {
  require(path.resolve(modelPath));
});
config.getGlobbedFiles('./routes/**/*.js').forEach(function(routePath) {
  require(path.resolve(routePath))(app);
});

// Logger

app.use(logger());


//app.use(route.get('/async', messages.delay));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log('listening on port ' + process.env.PORT || 3000);
}
