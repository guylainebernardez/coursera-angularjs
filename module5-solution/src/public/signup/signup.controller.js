(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var signUpCtrl = this;

  signUpCtrl.user = MenuService.getUserInfo();

  signUpCtrl.submit = function () {
    var shortnames = MenuService.getMenuItemsByShortNames(signUpCtrl.user.favDish).then(function (response) {
        signUpCtrl.user.favDishDetails = response.data;
        MenuService.saveUser(signUpCtrl.user);
        signUpCtrl.showMessage = true;
        signUpCtrl.showError = false;
    }, function(error) {
      MenuService.saveUser({});
      signUpCtrl.showError = true;
      signUpCtrl.showMessage = false;
    });

  };
}

})();
