'use strict';

var dependencies = require('../test.dependencies');

var objectToTest = '<%= moduleNameClass %>RouterConfig';

describe(objectToTest, function () {
    var rootScope,
        state,
        location;

    dependencies.configureDepencencies();

    beforeEach(inject(function ($rootScope, $state, $location) {
        rootScope = $rootScope;
        state = $state;
        location = $location;
    }));

    it('should respond <%= moduleName %> state', function() {
        expect(state.href('<%= moduleName %>')).toEqual('#/<%= moduleName %>');
    });

    it('redirects to otherwise page after locationChangeSuccess', function() {
        location.path('/<%= moduleName %>');
        rootScope.$emit("$locationChangeSuccess");
        expect(location.path()).toBe("/<%= moduleName %>");
    });
});
