'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);

var templateContext;

var LeptirGenerator = yeoman.generators.Base.extend({

  prompting: function(){
    var done = this.async();

    this.log(
      'Welcome to the sensational ' + chalk.cyan('leptir') + ' generator!'
    );

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name?'
      },
      {
        name: 'devName',
        message: 'What is your name?'
      },
      {
        name: 'devEmail',
        message: 'What is your email?'
      },
      {
        name: 'devGitHubUrl',
        message: 'What is your github url?'
      },
      {
        name: 'projGitHubUrl',
        message: 'What is your projects github url?'
      },
      {
            type: 'confirm',
            name: 'addDemoModule',
            message: 'Would you like to generate a demo module ?',
            default: true
        }
      ];

    this.prompt(prompts, function(props){
      console.log('Damir :' + props);
      this.props = props;
      this.appName = this.props.appName;
      this.devName = this.props.devName;
      this.devEmail = this.props.devEmail;
      this.devGitHubUrl = this.props.devGitHubUrl;
      this.projGitHubUrl = this.props.projGitHubUrl;
      this.addDemoModule = this.props.addDemoModule;

      done();
    }.bind(this));
  },
  scaffoldProject: function(){
    var done = this.async();

    this.templateContext = {
      appName: this.appName,
      devName: this.devName,
      devEmail: this.devEmail,
      devGitHubUrl: this.devGitHubUrl,
      projGitHubUrl: this.projGitHubUrl
    };

    this.directory('public', 'public');

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
      this.templateContext
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
      this.templateContext
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      this.templateContext
    );

    this.fs.commit(function(){
      done();
    });
  },
  generateDemoModule: function() {
      if (this.addDemoModule) {
          var done = this.async();
          this.invoke("leptir:module", {args: ["Demo"]}, function(){
              done();
          });
      }
  },
  // installDependencies: function () {
  //   this.installDependencies();
  // }

});

module.exports = LeptirGenerator;
