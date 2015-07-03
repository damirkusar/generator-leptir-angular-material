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
  writeToIndex: function (moduleName, name, type) {

      var path = s.sprintf('public/modules/%s/', moduleName);
      var file = s.sprintf('%sindex.js', path);
      if(isThere(file)){

      var textToAppend = s.sprintf('require(\'./js/%s/%s.js\');  // jshint ignore:line', type, name);
      var containsName = s.include(fs.read(file), textToAppend);

      if(!containsName){
        log.info(chalk.blue('Appending to module\'s index.js.'));
        gulp.src(file)
          .pipe(eol())
          .pipe(insert.append(textToAppend))
          .pipe(gulp.dest(path));
      } else {
        log.info(chalk.magenta('Nothing to append. File: ' + name + ' already added.'))
      }

    } else {
      log.error(chalk.red(file + ' not found.'));
    }
  }
};
