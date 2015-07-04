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
var uniqueModules = require('./../common/getUniqueModules');
var writeToModuleIndex = require('./../common/writeToModuleIndex');
var yosay = require('yosay');

var store = memFs.create();
var fs = editor.create(store);

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.argument('viewName', {
      required: true,
      type: String,
      desc: 'The view name'
    });

    this.log(yosay('You called the ' +  chalk.cyan('leptir') + ' view generator with the argument ' + this.viewName + '.'));
  },

  getModule: function() {
    var done = this.async();

    var uModules = uniqueModules.getUniqueModules();

    var prompts = [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Into which module do you want to create this view?',
      choices: uModules
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.moduleName = this.props.moduleName;

      done();
    }.bind(this));
  },

  createViewInModule: function(){
    this.convertedViewNameClass = s(this.viewName).humanize().classify().value();
    this.convertedViewName = s(this.convertedViewNameClass).decapitalize().value();

    this.fullName = this.convertedViewName;

    this.templateContext = {
      viewName: this.convertedViewNameClass,
      moduleName: this.moduleName
    };

    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath('public/modules/'+this.moduleName+'/views/'+this.fullName+'.html'),
      this.templateContext
    );
  }

  }
);
