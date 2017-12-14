var socket;
var angularApp = angular.module('hangmanApp', []);


  angularApp.controller('loginController', ['$scope', function($scope) {
    console.log("loging ");
    socket = io.connect('http://' + document.domain + ':' + location.port);
    
    $scope.myFunc = function() {
        socket.emit('message', $scope.name);
    };

    socket.on('word', function(data){
            console.log(data);
        });
  }]);
