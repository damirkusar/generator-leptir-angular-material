'use strict';

var s = require("underscore.string");
var Log = require('log');
var log = new Log('info');
var walkSync = require('walk-sync');

module.exports = {
  getUniqueModules: function(){
    
    var folders = new Array();
    var uniqueModules = new Array();

    var paths = walkSync('public/modules');

    for (var i = 0; i < paths.length; i++) {
      if(s.include(paths[i], '/')){
        var words = s.words(paths[i], "/");
        folders.push(words[0]);
      }
    }

    uniqueModules = folders.filter(function(elem, pos) {
      return folders.indexOf(elem) == pos;
    });

    return uniqueModules;
  }
};
