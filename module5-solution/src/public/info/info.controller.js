(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'ApiPath'];
function MyInfoController(MenuService, ApiPath) {
  var myInfoCtrl = this;
  myInfoCtrl.basePath = ApiPath;
  myInfoCtrl.user = MenuService.getUserInfo();
}


})();
