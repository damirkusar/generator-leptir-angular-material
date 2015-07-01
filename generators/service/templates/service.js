'use strict';

angular.module('<%= moduleName %>').factory('<%= serviceName %>Service', [function () {

    return {
        getDummyText: function(){
            return 'dummyText';
        }
    };

}]);
