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
    this.argument('directiveName', {
      required: true,
      type: String,
      desc: 'The directive name'
    });

    this.log(yosay('You called the ' +  chalk.cyan('leptir') + ' directive generator with the argument ' + this.directiveName + '.'));
  },

  getModule: function() {
    var done = this.async();

    var uModules = uniqueModules.getUniqueModules();

    var prompts = [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Into which module do you want to create this directive?',
      choices: uModules
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.moduleName = this.props.moduleName;

      done();
    }.bind(this));
  },

  createDirectiveInModule: function(){
    this.convertedDirectiveNameClass = s(this.directiveName).humanize().classify().value();
    this.convertedDirectiveName = s(this.convertedDirectiveNameClass).decapitalize().value();

    this.fullName = this.convertedDirectiveName+'.directive';

    this.templateContext = {
      directiveName: this.convertedDirectiveNameClass,
      moduleName: this.moduleName
    };

    this.fs.copyTpl(
      this.templatePath('directive.js'),
      this.destinationPath('public/modules/'+this.moduleName+'/js/directives/'+this.fullName+'.js'),
      this.templateContext
    );
  },

  writeIndex: function () {
    writeToModuleIndex.writeToIndex(this.moduleName, this.fullName, 'directives');
  }

  }
);
