'use strict';

ApplicationConfiguration.registerModule('<%= moduleName %>');

require('./js/config/<%= moduleName %>.route.js');
require('./js/config/<%= moduleName %>.menu.js');
require('./js/controllers/<%= moduleName %>.controller.js');
require('./js/directives/<%= moduleName %>.directive.js');
require('./js/services/<%= moduleName %>.service.js');
