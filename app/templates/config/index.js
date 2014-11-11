'use strict';
var glob = require('glob'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  mysql = (require('./mysql'))();

mongoose.plugin(function(schema) {
  schema.method('persist', function() {
    var model = this;

    return function(callback) {
      model.save(callback);
    };
  });
  schema.method('destroy', function() {
    var model = this;

    return function(callback) {
      model.remove(callback);
    };
  });
});

require.extensions['.controller.js'] = require.extensions['.js'];
require.extensions['.model.js'] = require.extensions['.js'];
require.extensions['.routes.js'] = require.extensions['.js'];

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
  // For context switching
  var _this = this;

  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      glob(globPatterns, {
        sync: true
      }, function(err, files) {
        if (removeRoot) {
          files = files.map(function(file) {
            return file.replace(removeRoot, '');
          });
        }

        output = _.union(output, files);
      });
    }
  }

  return output;
};
