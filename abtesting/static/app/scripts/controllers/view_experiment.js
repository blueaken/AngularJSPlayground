'use strict';

angular.module('nvaApp')
    .controller('ViewEditExperimentController', ['$scope', '$http', '$cookies', '$window', '$location', function($scope, $http, $cookies, $window, $location) {
        this.captionViewEditExperiment = "View/Edit Experiment";
        this.captionVariances = "Variances";

        $scope.notificationTypes = [];
        var response = $http.get('/nva/api/v1/experiment/notificationTypes');
        response.success(function(data){
            $scope.notificationTypes = data;
        });

        response.error(function(data, status){
            alert( "failure message: " + JSON.stringify({status: status, data: data}));
        });

        this.experimentName = $cookies.currentExperimentName;
        if (this.experimentName === null) {
            alert("Current experimentName is null! Create a valid experiment first!");
        } else {
            var encodedUrl = '/nva/api/v1/experiment/name/' + encodeURI(this.experimentName);
            $http.get(encodedUrl).success(function (data) {
                $scope.experiment = data;
            });
        }

        this.editVariance = function(varianceIndex){
            $cookies.currentVarianceIndex = varianceIndex;

            $location.path("/edit_variance_app");
        };

        this.addVariance = function(){
            $location.path("/create_variance_app");
        };

        this.deleteVariance = function(variance){
            var deleteIndex = $scope.experiment.variants.indexOf(variance);
            $scope.experiment.variants.splice(deleteIndex, 1);
        };

        this.saveExperimentUpdate = function(){
            var response = $http.put('/nva/api/v1/experiment/name/' + this.experimentName, $scope.experiment);
            response.success(function(){
                $location.path("/view_experiment_app");
            });
            response.error(function(data, status){
                alert( "failure message: " + JSON.stringify({status: status, data: data}));
            });

        };

    } ]);