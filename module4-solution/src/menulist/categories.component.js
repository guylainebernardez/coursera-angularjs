(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menulist/templates/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
