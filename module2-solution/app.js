(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// To Buy List - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyList = this;

  ToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  ToBuyList.moveToAlreadyBought = function (itemIndex, item) {
    ShoppingListCheckOffService.removeItem(itemIndex);
    ShoppingListCheckOffService.addItem(item);
  };

}

// Already Bought List - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBoughtList = this;

  AlreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of To Buy Items
  var ToBuyItems = [
    {name: "cookies", quantity: 10},
    {name: "chips", quantity: 20},
    {name: "pizza", quantity: 2},
    {name: "sushi", quantity: 15},
    {name: "beef tonkatsu", quantity: 3}
  ];

  //List of Already Bought Items
  var AlreadyBoughtItems = [];

  //returning the to buy items list
  service.getToBuyItems = function () {
    return ToBuyItems;
  };

  //remove the item in the list of to buy items
  service.removeItem = function (itemIndex) {
    ToBuyItems.splice(itemIndex, 1);
  };

  //add the item to the already bought items
  service.addItem = function (item) {
    AlreadyBoughtItems.push(item);
  };

  //returning the already bought items list
  service.getAlreadyBoughtItems = function () {
    return AlreadyBoughtItems;
  };

}

})();
