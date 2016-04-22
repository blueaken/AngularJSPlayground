'use strict';

angular.module('nvaApp')
    .controller('SearchExperimentControl', ['$scope', '$http', '$window', '$cookies', '$location', function($scope, $http, $window, $cookies, $location){
        this.captionSearchExperiment = "Search Experiment";
        $scope.experimentName = '';

        //initial load all the experiments on the result page
        $scope.experiments = [];
        $http.get('/nva/api/v1/experiment/')
            .success(function(data){
                $scope.experiments = data;
            })
            .error(function(data, status){
                alert( "failure message: " + JSON.stringify({status: status, data: data}));
            });

        this.searchExperiment = function(){
            if ($scope.experimentName == ''){
                alert("Experiment Name cannot be empty!");
            } else{
                $scope.experiments = [];
                var response = $http.get('/nva/api/v1/experiment/name/' + $scope.experimentName);
                response.success(function(data){
                    if(angular.isArray(data)){
                        $scope.experiments = data;
                    }else{
                        $scope.experiments.push(data);
                    }
                });

                response.error(function(data, status){
                    alert( "failure message: " + JSON.stringify({status: status, data: data}));
                });

            }
        };

        this.editExperiment = function(experimentName){
            $cookies.currentExperimentName = experimentName;

            $location.path("/view_experiment_app");
        };

        this.deleteExperiment = function(experimentName){
            var encodedUrl = '/nva/api/v1/experiment/name/' + encodeURI(experimentName);
            var response = $http.delete(encodedUrl);
            response.success(function(data){
                //delete success then refresh scope.experiments
                $scope.experiments = [];
                var response = $http.get('/nva/api/v1/experiment');
                response.success(function(data){
                    $scope.experiments = data;
                });

                response.error(function(data, status){
                    alert( "failure message: " + JSON.stringify({status: status, data: data}));
                });
            });

            response.error(function(data, status){
                alert( "failure message: " + JSON.stringify({status: status, data: data}));
            });

        };

    } ]);