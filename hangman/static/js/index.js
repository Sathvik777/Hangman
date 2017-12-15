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
      localStorage.setItem("sessionKey", autunticationResponse.sessionKey);
      localStorage.setItem("username", autunticationResponse.username);
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
    console.log($scope.displayWord);

    
  }
  newGame();

}]);
