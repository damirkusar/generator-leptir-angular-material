'use strict';

angular.module('<%= moduleName %>')
    .controller('<%= moduleNameClass %>Ctrl', ['$scope', function($scope){
        $scope.ModuleTest = "Modify me in <%= moduleName %> Module";
}]);
