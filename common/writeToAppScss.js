'use strict';

var chalk = require('chalk');
var s = require("underscore.string");
var Log = require('log');
var log = new Log('info');
var isThere = require("is-there");
var gulp = require('gulp');
var eol = require('gulp-eol');
var insert = require('gulp-insert');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var store = memFs.create();
var fs = editor.create(store);

module.exports = {
  writeAppScss: function (moduleName, styleName) {
      if(isThere('public/app.scss')){

      var textToAppend = "@import \"modules/" + moduleName + "/css/"+ styleName +"\";";
      var containsModuleName = s.include(fs.read('public/app.scss'), textToAppend);

      if(!containsModuleName){
        log.info(chalk.blue('Appending module to app.scss.'));
        gulp.src('public/app.scss')
          .pipe(eol())
          .pipe(insert.append(textToAppend))
          .pipe(gulp.dest('public/'));
      } else {
        log.info(chalk.magenta('Nothing to append. Module: ' + moduleName + ' already added.'))
      }

    } else {
      log.error(chalk.red('No app.scss found.'));
    }
  }
};
