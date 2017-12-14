var socket = io('http://' + document.domain + ':' + location.port);
var angularApp = angular.module('hangmanApp', []);
var serverUrl = 'http://' + document.domain + ':' + location.port;
var sessionKey = localStorage.getItem('sessionKey');
var username = localStorage.getItem('username');
  

  angularApp.controller('loginController', ['$scope', function($scope) {
    console.log("loging ");
    //socket = io.connect('http://' + document.domain + ':' + location.port);
    if(sessionKey !== null)$scope.name = username;
    $scope.myFunc = function() {
      $.get( serverUrl+"/login?username="+$scope.name, function( autunticationResponse ) {
        $( "#loginView" ).hide();
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

  angularApp.controller('displayWord', ['$scope', function($scope) {
      $scope.on('logedin', function(event, args){
        console.log("logedin");
        socket = io.connect();
        socket.emit('start',{
          "session_key" : sessionKey
        } );

        socket.on('started',function(data){
          console.log(data);
        } );

      });

  }]);
