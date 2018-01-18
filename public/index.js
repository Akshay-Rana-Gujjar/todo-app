var app = angular.module('akshayTodo', []);

var API_ENDPOINT = "/api/v1/todos/"

app.controller("appController",function($scope, $http){

  $scope.todoData = {}

  // send request to node api
  $http.get(API_ENDPOINT)
  .then(function(res){
    $scope.todos = res.data;
    console.log($scope.todos);
  }
  ,function(err){
    console.log("Error", err);
  });


  // send POST request to the api
  $scope.createTodo = function(){

    $http.post(API_ENDPOINT , $scope.todoData)
    .then(function(res){
      $scope.todoData = {};
      $scope.todos.push(res.data);
      console.log($scope.todos);
    },
    function(err){
      console.log("Error", err);
    });
  }

  // send DELETE request
  $scope.deleteTodo = function(id , index){
    $http.delete(API_ENDPOINT + id )
    .then(function(res){
      $scope.todos.splice(index,1);
      console.log($scope.todos);
    },function(err){
      console.log("Error", err);
    });
  }


});