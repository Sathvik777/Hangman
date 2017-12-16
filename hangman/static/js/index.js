//var socket = io('http://' + document.domain + ':' + location.port);
var angularApp = angular.module('hangmanApp', []);
var serverUrl = 'http://' + document.domain + ':' + location.port;
var sessionKey = localStorage.getItem('sessionKey');
var username = localStorage.getItem('username');


angularApp.controller('loginController', ['$scope', function ($scope) {
  console.log("loging ");
  //socket = io.connect('http://' + document.domain + ':' + location.port);
  if (sessionKey !== null) $scope.name = username;
  $scope.myFunc = function () {
    $.get(serverUrl + "/login?username=" + $scope.name, function (autunticationResponse) {
      $("#loginView").hide();
      $scope.$broadcast('logedin', );
      console.log(autunticationResponse);
      sessionKey = autunticationResponse.sessionKey;
      username = autunticationResponse.username;
      localStorage.setItem("sessionKey", sessionKey);
      localStorage.setItem("username", username);
    });
  };

  /*socket.on('word', function(data){
          console.log(data);
      });
   */
}]);

angularApp.controller("gameController", ['$scope', function ($scope) {
  // TODO: Get word length or word from server 
  var word = "3dhubs";
  $scope.inCorrectLetters = [];
  $scope.correctLeters = [];
  $scope.guessLimit = 6;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }

  var newGame = function () {
    $scope.inCorrectLetters = [];
    $scope.correctLeters = [];
    $scope.guessLimit = 6;
    $scope.displayWord = Array(word.length).join('_ ');


  }

  $scope.letterChosen = function () {
    var inpuLetterToLowerCase = $scope.letter.toLowerCase();
    if (contains.call(correctLeters, inpuLetterToLowerCase)) {
      console.log($scope.letter);
    } else if (contains.call(inCorrectLetters, inpuLetterToLowerCase)) {
      console.log(inpuLetterToLowerCase);
    } else {
      /// verify if correct or wrong
      // make requet to server 
      $post(serverUrl + "/play",
       { session_key: sessionKey,
         key_pressed: inpuLetterToLowerCase }
        ).done(function (data) {
        console.log();
      }).fail(function () {
        // reset to login page if authuntication error

      })

    }
  }


  newGame();

}]);


var contains = function (needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;

  if (!findNaN && typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (needle) {
      var i = -1, index = -1;

      for (i = 0; i < this.length; i++) {
        var item = this[i];

        if ((findNaN && item !== item) || item === needle) {
          index = i;
          break;
        }
      }

      return index;
    };
  }

  return indexOf.call(this, needle) > -1;
};