var angularApp = angular.module('hangmanApp', []);
var serverUrl = 'http://' + document.domain + ':' + location.port;
var sessionKey = localStorage.getItem('sessionKey');
var username = localStorage.getItem('username');

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

angularApp.controller('rootController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.inCorrectLetters = [];
  $scope.correctLeters = [];
  $scope.guessLimit = 6;
  $scope.score = 60;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }
  $scope.session_key = sessionKey;
  $scope.myFunc;
  $scope.leaderBoard = [];
  $scope.message = ''
  console.log("session key set to true");
  if (sessionKey !== null) {
    $("#loginView").hide();
    $scope.name = username;
  } else {
    $("#gameView").hide();
    $("#loginView").show();
    $("#leaderboardView").hide();

  }

}]);



angularApp.controller('loginController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {


  $scope.loginFunction = function () {
    $http.get(serverUrl + "/login?username=" + $scope.name).then(function (autunticationResponse) {
      console.log(autunticationResponse.data);
      sessionKey = autunticationResponse.data.sessionKey;
      username = autunticationResponse.data.username;
      localStorage.setItem("sessionKey", sessionKey);
      localStorage.setItem("username", username);
      $("#loginView").hide();
      $("#leaderboardView").hide();
      $rootScope.$broadcast('loggedin', );

    });
  };

}]);

angularApp.controller("gameController", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

  var selectedWord = '';
  $scope.inCorrectLetters = [];
  $scope.correctLeters = [];
  $scope.guessLimit = 6;
  $scope.score = 60;

  newGame = function (event, sessionKey) {
    $("#gameView").show();
    console.log("new game troggered");
    $scope.inCorrectLetters = [];
    $scope.correctLetters = [];
    $scope.guessLimit = 6;
    $scope.score = 60;
    var requestBody = JSON.stringify({ 'session_key': localStorage.getItem('sessionKey') });
    $http.post(serverUrl + "/start", requestBody).then(function (response) {
      selectedWord = response.data.word;
      $scope.displayWord = Array(selectedWord.length).join('_');
    });
  }

  $scope.charecterInput = function () {
    var inpuLetterToLowerCase = $scope.input.guess.toLowerCase();
    console.log(inpuLetterToLowerCase);
    if (contains.call($scope.correctLetters, inpuLetterToLowerCase)) {
      console.log(inpuLetterToLowerCase);
    } else if (contains.call($scope.inCorrectLetters, inpuLetterToLowerCase)) {
      console.log(inpuLetterToLowerCase);
    } else {
      // get the word from the server 

      /// verify if correct or wrong
      // make requet to server 
      var correct = false;
      for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i].toLowerCase() == inpuLetterToLowerCase) {
          $scope.displayWord = $scope.displayWord.substr(0, i) + inpuLetterToLowerCase + $scope.displayWord.substr(i + inpuLetterToLowerCase.length);
          //$scope.displayWord = selectedWord;
          correct = true;

        }
      }
      if (correct) {
        $scope.correctLetters = $scope.correctLetters.concat(inpuLetterToLowerCase);
        console.log($scope.correctLeters);
      } else {
        $scope.guessLimit--;
        $scope.inCorrectLetters = $scope.inCorrectLetters.concat(inpuLetterToLowerCase);
        console.log($scope.inCorrectLetters);

      }

      $scope.input.guess = "";
      if ($scope.guessLimit == 0) {
        $scope.message = "You Lost";
        var requestBody = JSON.stringify({ 'session_key': localStorage.getItem('sessionKey') });

        $http.post(serverUrl + "/end?won=0", requestBody).then(function (response) {
          newGame();
        });
      }
      if ($scope.displayWord.indexOf("_") == -1) {
        $scope.message = "You Won with score " + $scope.guessLimit * 10;
        var requestBody = JSON.stringify({
          'session_key': localStorage.getItem('sessionKey'),
          'score': $scope.guessLimit * 10
        });

        $http.post(serverUrl + "/end?won=1", requestBody).then(function (response) {

          newGame();
        });
      }




    }
  }
  if (sessionKey !== null) {

    newGame();
  }
  $rootScope.$on('loggedin', function () {
    newGame();
  });
}]);

angularApp.controller('leaderboardViewController', ['$scope', '$http', function ($scope, $http) {
  $scope.leaderBoard = [];
  $scope.showLeaderboard = function () {

    $http.get(serverUrl + "/leaderboard").then(function (response) {
      console.log(response.data);
      $scope.leaderBoard = response.data;
    });
  }
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
angularApp.directive("limitTo", [function () {
  return {
    restrict: "A",
    link: function (scope, elem, attrs) {
      var limit = parseInt(attrs.limitTo);
      angular.element(elem).on("keypress", function (e) {
        if (this.value.length == limit) e.preventDefault();
      });
    }
  }
}]);