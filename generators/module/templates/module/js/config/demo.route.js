'use strict';

angular.module('<%= moduleName %>').config(['$stateProvider', function($stateProvider) {
    $stateProvider.
        state("<%= moduleName %>",
        {
            parent: "root",
            url: "/<%= moduleName %>",
            views: {
                "": {
                    controller: "<%= moduleNameClass %>Ctrl",
                    templateUrl: "modules/<%= moduleName %>/views/index.html"
                },
                "<%= moduleName %>.partial@<%= moduleName %>": {
                    controller: "<%= moduleNameClass %>Ctrl",
                    templateUrl: "modules/<%= moduleName %>/views/partial.html"
                }
            }
        });
}]);
