'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);

var LeptirGenerator = yeoman.generators.Base.extend({

  prompting: function(){
    var done = this.async();

    this.log(
      'Welcome to the sensational ' + chalk.red('Leptir-Angular') + ' generator!'
    );

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name?'
    },
      {
        type: 'confirm',
        name: 'addDemoModule',
        message: 'Would you like to generate a demo module?',
        default: true
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.appName = this.props.appName;
      this.addDemoModule = this.props.addDemoModule;

      done();
    }.bind(this));
  },
  scaffoldProject: function(){

    this.fs.copy(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      { appName: this.appName }
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('editorconfig')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('jshintrc')
    );

    this.fs.copy(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { appName: this.appName }
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.directory('public', 'public');

  },

});

module.exports = LeptirGenerator;
