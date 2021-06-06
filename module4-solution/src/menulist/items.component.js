(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/menulist/templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
