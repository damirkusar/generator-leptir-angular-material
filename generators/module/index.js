'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var isThere = require("is-there");
var s = require("underscore.string");
var gulp = require('gulp');
var insert = require('gulp-insert');
var eol = require('gulp-eol');
var writeToAppScss = require('./../common/writeToAppScss');

var store = memFs.create();
var fs = editor.create(store);

var convertedModuleNameClass, convertedModuleName, templateContext;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();

    this.argument('moduleName', {
      required: true,
      type: String,
      desc: 'The modules name'
    });

    this.log('You called the ' +  chalk.cyan('leptir') + ' subgenerator module with the argument: ' + this.moduleName + '.');

    this.convertedModuleNameClass = s(this.moduleName).humanize().classify().value();
    this.convertedModuleName = s(this.convertedModuleNameClass).decapitalize().value();
    this.log('modulenameClass converted to: ' + this.convertedModuleNameClass + '.');
    this.log('modulename converted to: ' + this.convertedModuleName + '.');

    this.templateContext = {
      moduleNameClass: this.convertedModuleNameClass,
      moduleName: this.convertedModuleName
    };

    done();
  },

  writingModule: function () {
    var done = this.async();

    if(isThere('public/modules')){
      this.log(chalk.blue('Modules folder found.'));

      this.fs.copyTpl(
        this.templatePath('module/index.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/index.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/css/demo.scss'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/css/'+this.convertedModuleName+'.scss'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/js/config/demo.menu.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/js/config/'+this.convertedModuleName+'.menu.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/js/config/demo.route.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/js/config/'+this.convertedModuleName+'.route.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/js/controllers/demo.controller.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/js/controllers/'+this.convertedModuleName+'.controller.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/js/directives/demo.directive.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/js/directives/'+this.convertedModuleName+'.directive.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/js/services/demo.service.js'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/js/services/'+this.convertedModuleName+'.service.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/views/index.html'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/views/index.html'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('module/views/partial.html'),
        this.destinationPath('public/modules/'+this.convertedModuleName+'/views/partial.html'),
        this.templateContext
      );

    } else {
      this.log(chalk.red('Error: No modules folder found.'));
    }

    done();
  },

  writingTest: function () {
    var done = this.async();

    if(isThere('public/tests')){
      this.log(chalk.blue('Tests folder found.'));

      this.fs.copyTpl(
        this.templatePath('test/test.dependencies.js'),
        this.destinationPath('public/tests/'+this.convertedModuleName+'/test.dependencies.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('test/config/demo.menu.test.js'),
        this.destinationPath('public/tests/'+this.convertedModuleName+'/config/'+this.convertedModuleName+'.menu.test.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('test/config/demo.route.test.js'),
        this.destinationPath('public/tests/'+this.convertedModuleName+'/config/'+this.convertedModuleName+'.route.test.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('test/controllers/demo.controller.test.js'),
        this.destinationPath('public/tests/'+this.convertedModuleName+'/controllers/'+this.convertedModuleName+'.controller.test.js'),
        this.templateContext
      );

      this.fs.copyTpl(
        this.templatePath('test/services/demo.service.test.js'),
        this.destinationPath('public/tests/'+this.convertedModuleName+'/services/'+this.convertedModuleName+'.service.test.js'),
        this.templateContext
      );

    } else {
      this.log(chalk.red('Error: No tests folder found.'));
    }

    done();
  },

  writingAppJs: function () {
    var done = this.async();

    if(isThere('public/app.js')){

      var textToAppend = "require('./modules/" + this.convertedModuleName + "');";
      var containsModuleName = s.include(this.fs.read('public/app.js'), textToAppend);

      if(!containsModuleName){
        this.log(chalk.blue('Appending module to app.js.'));
        gulp.src('public/app.js')
          .pipe(eol())
          .pipe(insert.append(textToAppend))
          .pipe(gulp.dest('public/'));
      } else {
        this.log(chalk.magenta('Nothing to append. Module: ' + this.convertedModuleName + ' already added.'))
      }

    } else {
      this.log(chalk.red('Error: No app.js found.'));
    }

    done();
  },

  writeAppScss: function () {
    writeToAppScss.writeAppScss(this.convertedModuleName, this.convertedModuleName);
  }
});
