(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onEmpty: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";

  menu.addSearchTerm = function(searchTerm) {

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function(items) {
      if (items && items.length > 0) {
        menu.message = '';
        menu.found = items;
      } else {
        menu.message = 'Nothing found!';
        menu.found = [];
      }
    });
  };

  menu.removeMenuItem = function(itemIndex) {
    menu.found.splice(itemIndex, 1);
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    searchTerm = searchTerm.trim().toLowerCase();

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      var foundItems = [];

      for (var i = 0; i < response.data.menu_items.length; i++) {
        if (searchTerm.length > 0 && response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
          foundItems.push(response.data.menu_items[i]);
        }
      }

      return foundItems;

    }).catch(function (error) {
      console.log("There was an error in retrieving the data!");
    });

  };

}
})();
