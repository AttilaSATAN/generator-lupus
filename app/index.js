'use strict';
var util = require('util');

var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var MyGeneratorGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Here we hawl!'
    ));


    var prompts = [{
      name: 'appName',
      message: 'Name your magnificent application?',
      default: 'Lupus'
    }];


    this.prompt(prompts, function(props) {
      this.appName = this._.slugify(props.appName);

      done();
    }.bind(this));
  },

  writing: {
    app: function() {

      this.dest.mkdir('config');
      this.dest.mkdir('controllers');
      this.dest.mkdir('models');
      this.dest.mkdir('public');
      this.dest.mkdir('routes');
      this.dest.mkdir('test');
      this.dest.mkdir('views');
    },

    projectfiles: function() {
      this.src.copy('_app.js', 'app.js');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('_gulpfile.js', '.gulpfile.js');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('_package.json', 'package.json');
    }
  },

  end: function() {
    this.installDependencies();
  }
});

module.exports = MyGeneratorGenerator;
