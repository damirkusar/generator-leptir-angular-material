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
var dir = require('node-dir');
var uniqueModules = require('./../../common/getUniqueModules');
var writeToModuleIndex = require('./../../common/writeToModuleIndex');

var store = memFs.create();
var fs = editor.create(store);

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.argument('controllerName', {
      required: true,
      type: String,
      desc: 'The controller name'
    });

    this.log('You called the ' +  chalk.cyan('leptir') + ' controller generator with the argument ' + this.controllerName + '.');
  },

  getModule: function() {
    var done = this.async();

    var uModules = uniqueModules.getUniqueModules();
    this.log('uModules: ' + uModules);

    var prompts = [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Into which module do you want to create this controller?',
      choices: uModules
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.moduleName = this.props.moduleName;

      done();
    }.bind(this));
  },

  createControllerInModule: function(){
    this.convertedControllerNameClass = s(this.controllerName).humanize().classify().value();
    this.convertedControllerName = s(this.convertedControllerNameClass).decapitalize().value();

    this.fullName = this.convertedControllerName+'.controller';

    this.templateContext = {
      controllerName: this.convertedControllerNameClass,
      moduleName: this.moduleName
    };

    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath('public/modules/'+this.moduleName+'/js/controllers/'+this.fullName+'.js'),
      this.templateContext
    );
  },

  writeIndex: function () {
    writeToModuleIndex.writeToIndex(this.moduleName, this.fullName, 'controllers');
  }

  }
);
