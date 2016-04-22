'use strict';

angular.module('nvaApp')
    .controller('CreateExperimentController', ['$http', '$location', '$cookies', '$scope', function($http, $location, $cookies, $scope){
        this.captionCreateExperiment = "Create Experiment";

        $scope.notificationTypes = [];
        var response = $http.get('/nva/api/v1/experiment/notificationTypes');
        response.success(function(data){
            $scope.notificationTypes = data;
        });

        response.error(function(data, status){
            alert( "failure message: " + JSON.stringify({status: status, data: data}));
        });

        $scope.experiment = {};
        $scope.experiment.variants = [];
        $scope.experiment.createdDate = new Date();
        $scope.experiment.createdBy = 'test';
        $scope.experiment.updatedDate = new Date();
        $scope.experiment.updatedBy = 'test';

        this.addExperiment = function(){
            $scope.experiment.enabled = angular.element(document.querySelector('#toggle_button_ce')).prop('checked');

            var response = $http.post('/nva/api/v1/experiment', $scope.experiment);
            response.success(function(){
                //set experiment name to cookie
                $cookies.currentExperimentName = $scope.experiment.experimentName;

                $location.path("/create_variance_app");
            });
            response.error(function(data, status){
                alert( "failure message: " + JSON.stringify({status: status, data: data}));
            });

        };
} ]);