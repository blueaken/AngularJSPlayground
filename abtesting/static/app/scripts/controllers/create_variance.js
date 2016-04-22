'use strict';

angular.module('nvaApp')
    .controller('CreateVarianceController', ['$scope', '$http', '$cookies', '$location', '$parse', '$timeout', function($scope, $http, $cookies, $location, $parse, $timeout){
        this.captionCreateVariance = "Create Variance";

        $scope.attributeTypes = [
            'String',
            'Date',
            'Integer'
        ];

        this.captionAttributes = "Attributes";
        $scope.attributes = [];

        this.attribute = {};
        this.addAttribute = function() {
            $scope.attributes.push(this.attribute);
            this.attribute = {};
        };

        this.experimentName = $cookies.currentExperimentName;
        $scope.occupiedIndexes = [];
        if (this.experimentName == null){
            alert("Current experimentName is null! Create a valid experiment first!");
        } else{
            $http.get('/nva/api/v1/experiment/name/' + this.experimentName).success(function(data){
                $scope.experiment = data;

                //build the occupiedIndexes array
                var variants = $scope.experiment.variants;
                angular.forEach(variants,function(value,index){
                    if (value.distributionIndexes.length > 0){
                        angular.forEach(value.distributionIndexes,function(value,index){
                            $scope.occupiedIndexes.push(value);
                        })
                    }
                })
            });
        }

        $scope.selectedIndex = [];
        //init the index map
        var tempScopeIndexIdKey = "";
        for (var i=0; i<100; i++){
            if (i<10){
                tempScopeIndexIdKey = "indexId0" + i;
            }
            else {
                tempScopeIndexIdKey = "indexId" + i;
            }
            $parse(tempScopeIndexIdKey).assign($scope, i);
        }
        $timeout(function() {
            // the code you want to run in the next digest
            $scope.$apply();
        });

        this.toggleSelectedIndex = function(indexId) {
            var existing = false;
            angular.forEach($scope.selectedIndex,function(value, index){
                if (value == indexId){
                    existing = true;
                    $scope.selectedIndex.splice(index, 1);
                }
            });

            if (!existing) {
                $scope.selectedIndex.push(indexId);
            };
        }

        this.isIndexOccupied = function(indexId) {
            return ($scope.occupiedIndexes.indexOf(indexId)!= -1);
        }

        this.colSelected = function(indexId) {
            var currentIndex;
            var currentValue;

            for (var i=0; i<10; i++){
                currentValue = i*10 + indexId;
                currentIndex = $scope.selectedIndex.indexOf(currentValue);
                if (currentIndex > -1){
                    $scope.selectedIndex.splice(currentIndex, 1);
                }else {
                    $scope.selectedIndex.push(currentValue);
                }
            }
        }

        this.rowSelected = function(indexId) {
            var currentIndex;
            var currentValue;

            for (var i=0; i<10; i++){
                currentValue = indexId*10 + i;
                currentIndex = $scope.selectedIndex.indexOf(currentValue);
                if (currentIndex > -1){
                    $scope.selectedIndex.splice(currentIndex, 1);
                }else {
                    $scope.selectedIndex.push(currentValue);
                }
            }
        }

        this.variance = {};
        this.variance.distributionIndexes = $scope.selectedIndex;
        this.variance.attributes = $scope.attributes;

        this.addVariance = function(){
            $scope.experiment.variants.push(this.variance);

            var response = $http.put('/nva/api/v1/experiment/name/' + $scope.experiment.experimentName, $scope.experiment);
            response.success(function(){
                $location.path("/view_experiment_app");
            });

            response.error(function(data, status){
                alert( "failure message: " + JSON.stringify({status: status, data: data}));
            });
        };

} ]);