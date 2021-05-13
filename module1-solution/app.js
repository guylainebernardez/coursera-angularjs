(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.input = "";
  $scope.message = "";
  $scope.note = "";
  $scope.stylecolor = "";

  $scope.checkIfTooMuch = function () {
    if (!$scope.input) { //checks if the input is empty
      $scope.stylecolor = "red";
      $scope.message = "Please enter data first";
    } else {
      $scope.stylecolor = "green";
      var arrayOfStrings = splitArrayOfStrings($scope.input);
      if (arrayOfStrings.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }
  };

  function splitArrayOfStrings(string) {
    var stringToSplit = "";
    stringToSplit = string.split(',');
    var checkEmptySpaces = stringToSplit.includes("");
    if (checkEmptySpaces) {
      $scope.note = "[NOTE]: An empty item is NOT considered an item so it is NOT included in the count!";
    }

    /* removing the white spaces in each array element */
    var removeWhiteSpaces = stringToSplit.map(function (el) {
      return el.trim();
    });

    /* don't include in final array if the content is an empty or white space*/
    var stringToSplit = removeWhiteSpaces.filter(function (el) {
      return el != "";
    });

    return stringToSplit;
  }
}

})();
