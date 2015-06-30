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
var uniqueModules = require('./getUniqueModules');

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
    this.fs.copy(
      this.templatePath('style.scss'),
      this.destinationPath('public/modules/'+this.moduleName+'/css/'+this.styleName+'.scss')
    );
  },

  writingAppScss: function () {
    var done = this.async();

    if(isThere('public/app.scss')){

      var textToAppend = "@import \"modules/" + this.moduleName + "/css/"+ this.styleName +"\";";
      var containsModuleName = s.include(this.fs.read('public/app.scss'), textToAppend);

      if(!containsModuleName){
        this.log(chalk.blue('Appending module to app.scss.'));
        gulp.src('public/app.scss')
          .pipe(eol())
          .pipe(insert.append(textToAppend))
          .pipe(gulp.dest('public/'));
      } else {
        this.log(chalk.magenta('Nothing to append. Module: ' + this.convertedModuleName + ' already added.'))
      }

    } else {
      this.log(chalk.red('Error: No app.scss found.'));
    }

    done();
  }

  }
);
