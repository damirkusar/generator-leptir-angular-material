'use strict';

angular.module('<%= moduleName %>')
    .controller('<%= controllerName %>Ctrl', ['$scope', function($scope){
        $scope.ControllerTest = "Modify me in <%= moduleName %> Module";
}]);
