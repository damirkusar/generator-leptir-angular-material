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
      var file = 'public/app.scss';

      if(isThere(file)){

        var textToAppend = "@import \"modules/" + moduleName + "/css/"+ styleName +"\";";
        var containsName = s.include(fs.read(file), textToAppend);

        if(!containsName){
          log.info(chalk.blue('Appending style to app.scss.'));
          gulp.src(file)
            .pipe(eol())
            .pipe(insert.append(textToAppend))
            .pipe(gulp.dest('public/'));
      } else {
        log.info(chalk.magenta('Nothing to append. Style: ' + styleName + ' already added.'))
      }

    } else {
      log.error(chalk.red('No app.scss found.'));
    }
  }
};
