'use strict';

angular.module('<%= moduleName %>').factory('<%= moduleNameClass %>Service', [function () {

    return {
        getDummyText: function(){
            return 'dummyText';
        }
    };

}]);
