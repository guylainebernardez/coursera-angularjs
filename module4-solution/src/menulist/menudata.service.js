(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  //method for getting all categories
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (response) {

      return response.data;

    }).catch(function (error) {
      console.log("There was an error in retrieving the data!");
    });
  };

  //method for getting items for each category
  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function (response) {

      return response.data.menu_items;

    }).catch(function (error) {
      console.log("There was an error in retrieving the data!");
    });
  };

}

})();
