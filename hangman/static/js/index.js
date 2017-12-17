var angularApp = angular.module('hangmanApp', []);
var serverUrl = 'http://' + document.domain + ':' + location.port;
var sessionKey = localStorage.getItem('sessionKey');
var username = localStorage.getItem('username');


angularApp.controller('loginController', ['$scope', function ($scope, $http) {
  if (sessionKey !== null) $scope.name = username;
  $scope.myFunc = function () {
    $http.get(serverUrl + "/login?username=" + $scope.name, function (autunticationResponse) {
      $("#loginView").hide();
      $scope.$broadcast('logedin', );
      console.log(autunticationResponse);
      sessionKey = autunticationResponse.sessionKey;
      username = autunticationResponse.username;
      localStorage.setItem("sessionKey", sessionKey);
      localStorage.setItem("username", username);
    });
  };
}]);

angularApp.controller("gameController", ['$scope', function ($scope, $http) {
  var word = "3dhubs";
  $scope.inCorrectLetters = [];
  $scope.correctLeters = [];
  $scope.guessLimit = 6;
  $scope.score = 60;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }
  $http

  var newGame = function () {
    $scope.inCorrectLetters = [];
    $scope.correctLeters = [];
    $scope.guessLimit = 6;
    $scope.score = 60;
    $http.post(serverUrl + "/start", { "session_key": sessionKey }).done(
      function (data) {
        word = data.word;
        $scope.displayWord = Array(word.length).join('_ ');
      }
    )

  }

  $scope.letterChosen = function () {
    var inpuLetterToLowerCase = $scope.letter.toLowerCase();
    if (contains.call(correctLeters, inpuLetterToLowerCase)) {
      console.log($scope.letter);
    } else if (contains.call(inCorrectLetters, inpuLetterToLowerCase)) {
      console.log(inpuLetterToLowerCase);
    } else {
      // get the word from the server 

      /// verify if correct or wrong
      // make requet to server 
      $post(serverUrl + "/play",
        {
          session_key: sessionKey,
          key_pressed: inpuLetterToLowerCase
        }
      ).done(function (data) {
        console.log();
      }).fail(function () {
        // reset to login page if authuntication error



      })

    }
  }


  //newGame();

}]);

angularApp.controller('leaderboardViewController', ['$scope', '$http', function ($scope, $http) {
  $scope.friends = [];
  $http.get(serverUrl + "/leaderboard" , function(response){
    $scope.friends.append(response);
  });
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