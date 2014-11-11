'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var MyGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the my subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.template('_controller.js',  'controllers/' + this._.slugify(this.name) + '.controller.js');
  }
});

module.exports = MyGenerator;
