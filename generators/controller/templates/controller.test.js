'use strict';

var dependencies = require('../test.dependencies');

var testObjectName = '<%= controllerName %>Ctrl';

describe(testObjectName, function () {
    var scope, createController;

    dependencies.configureDepencencies();

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function() {
            return $controller(testObjectName, {
                '$scope': scope
            });
        };
        createController();
    }));

    it('ModuleTest is correct', function() {
        expect(scope.ControllerTest).toBe('Modify me in <%= moduleName %> Module');
    });
});
