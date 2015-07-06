'use strict';

angular.module('<%= moduleName %>').directive('<%= directiveName %>Directive', [function () {

  return {
    restrict: 'AE', // A: Attribute, E: Element
    template: '<div><span>Directive in: <%= moduleName %>, with name: <%= directiveName %>Directive</span></div>'
  };

}]);
