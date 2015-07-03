'use strict';

ApplicationConfiguration.registerModule('<%= moduleName %>'); // jshint ignore:line

require('./js/config/<%= moduleName %>.route.js'); // jshint ignore:line
require('./js/config/<%= moduleName %>.menu.js'); // jshint ignore:line
require('./js/controllers/<%= moduleName %>.controller.js'); // jshint ignore:line
require('./js/directives/<%= moduleName %>.directive.js'); // jshint ignore:line
require('./js/services/<%= moduleName %>.service.js'); // jshint ignore:line
