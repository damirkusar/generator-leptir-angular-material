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
var uniqueModules = require('./../common/getUniqueModules');
var writeToAppScss = require('./../common/writeToAppScss');

var store = memFs.create();
var fs = editor.create(store);

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.argument('styleName', {
      required: true,
      type: String,
      desc: 'The style name'
    });

    this.log('You called the ' +  chalk.cyan('leptir') + ' style generator with the argument ' + this.styleName + '.');
  },

  getModule: function() {
    var done = this.async();

    var uModules = uniqueModules.getUniqueModules();
    this.log('uModules: ' + uModules);

    var prompts = [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Into which module do you want to create this style?',
      choices: uModules
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.moduleName = this.props.moduleName;

      done();
    }.bind(this));
  },

  createStyleInModule: function(){
    this.convertedStyleName = s(this.styleName).humanize().classify().decapitalize().value();

    this.fs.copy(
      this.templatePath('style.scss'),
      this.destinationPath('public/modules/'+this.moduleName+'/css/'+this.convertedStyleName+'.scss')
    );
  },

  writeAppScss: function () {
    writeToAppScss.writeAppScss(this.moduleName, this.convertedStyleName);
  }

  }
);
