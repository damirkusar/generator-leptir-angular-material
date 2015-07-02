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

var store = memFs.create();
var fs = editor.create(store);

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.argument('serviceName', {
      required: true,
      type: String,
      desc: 'The service name'
    });

    this.log('You called the ' +  chalk.cyan('leptir') + ' service generator with the argument ' + this.serviceName + '.');
  },

  getModule: function() {
    var done = this.async();

    var uModules = uniqueModules.getUniqueModules();
    this.log('uModules: ' + uModules);

    var prompts = [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Into which module do you want to create this service?',
      choices: uModules
    }];

    this.prompt(prompts, function(props){
      this.props = props;
      this.moduleName = this.props.moduleName;

      done();
    }.bind(this));
  },

  createServiceInModule: function(){
    this.convertedServiceNameClass = s(this.serviceName).humanize().classify().value();
    this.convertedServiceName = s(this.convertedServiceNameClass).decapitalize().value();

    this.fullName = this.convertedServiceName+'.service';

    this.templateContext = {
      serviceName: this.convertedServiceNameClass,
      moduleName: this.moduleName
    };

    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath('public/modules/'+this.moduleName+'/js/services/'+this.fullName+'.js'),
      this.templateContext
    );
  },

  createControllerInTest: function(){
    this.fs.copyTpl(
      this.templatePath('service.test.js'),
      this.destinationPath('public/tests/'+this.moduleName+'/services/'+this.fullName+'.test.js'),
      this.templateContext
    );
  },

  writeIndex: function () {
    writeToModuleIndex.writeToIndex(this.moduleName, this.fullName, 'services');
  }

  }
);
