'use strict';

angular.module('nvaApp')
    .controller('DatepickerCtrl', function ($scope) {
        $scope.dt = new Date();
        $scope.attributeTypes = [
            'String',
            'Date',
            'Integer'
        ];

        $scope.today = function() {
            $scope.startdt = new Date();
            $scope.enddt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.startdt = null;
            $scope.enddt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    })

.directive('indexTableEdit', function($compile){
    return {
        restrict: 'E',
        link: function (scope, element) {
            var html = '<table>';
            var singlequote = "'";

            html += '<tr>';
            html += '<td><div class="grid coordinate"></div></td>';
            for (var i=0; i<10; i++){
                html += '<td><div class="grid coordinate" ng-click="evCtrl.colSelected(' + i + ')">' + i + '</div></td>';
            }
            html += '</tr>';

            for (var i=0; i<10; i++){
                html += "<tr>";
                html += '<td><div class="grid coordinate" ng-click="evCtrl.rowSelected(' + i + ')">' + i*10 + '</div></td>';

                for (var j=0; j<10; j++){
                    if (i==0){
                        html += '<td><div class="grid" ng-class="{' + singlequote + 'selected' + singlequote + ' : selectedIndex.indexOf(indexId0' + j + ') != -1, ' + singlequote + 'occupied' + singlequote + ': evCtrl.isIndexOccupied(indexId0' + j + ')}" ng-click="evCtrl.isIndexOccupied(indexId0' + j + ')||evCtrl.toggleSelectedIndex(indexId0' + j + ')"></div></td>';
                    } else {
                        html += '<td><div class="grid" ng-class="{' + singlequote + 'selected' + singlequote + ' : selectedIndex.indexOf(indexId' + (i * 10 + j) + ') != -1, ' + singlequote + 'occupied' + singlequote + ': evCtrl.isIndexOccupied(indexId' + (i * 10 + j) + ')}" ng-click="evCtrl.isIndexOccupied(indexId' + (i * 10 + j) + ')||evCtrl.toggleSelectedIndex(indexId' + (i * 10 + j) + ')"></div></td>';
                    }
                }
                html += "</tr>";
            }
            html += '</table>';

            // compile the provided template against the current scope
            var compiledHtml = $compile(html)(scope);
            element.replaceWith(compiledHtml);
        }
    };
})

.directive('indexTableCreate', function($compile){
    return {
        restrict: 'E',
        link: function (scope, element) {
            var html = '<table>';
            var singlequote = "'";

            html += '<tr>';
            html += '<td><div class="grid coordinate"></div></td>';
            for (var i=0; i<10; i++){
                html += '<td><div class="grid coordinate" ng-click="cvCtrl.colSelected(' + i + ')">' + i + '</div></td>';
            }
            html += '</tr>';

            for (var i=0; i<10; i++){
                html += "<tr>";
                html += '<td><div class="grid coordinate" ng-click="cvCtrl.rowSelected(' + i + ')">' + i*10 + '</div></td>';

                for (var j=0; j<10; j++){
                    if (i==0){
                        html += '<td><div class="grid" ng-class="{' + singlequote + 'selected' + singlequote + ' : selectedIndex.indexOf(indexId0' + j + ') != -1, ' + singlequote + 'occupied' + singlequote + ': cvCtrl.isIndexOccupied(indexId0' + j + ')}" ng-click="cvCtrl.isIndexOccupied(indexId0' + j + ')||cvCtrl.toggleSelectedIndex(indexId0' + j + ')"></div></td>';
                    } else {
                        html += '<td><div class="grid" ng-class="{' + singlequote + 'selected' + singlequote + ' : selectedIndex.indexOf(indexId' + (i * 10 + j) + ') != -1, ' + singlequote + 'occupied' + singlequote + ': cvCtrl.isIndexOccupied(indexId' + (i * 10 + j) + ')}" ng-click="cvCtrl.isIndexOccupied(indexId' + (i * 10 + j) + ')||cvCtrl.toggleSelectedIndex(indexId' + (i * 10 + j) + ')"></div></td>';
                    }
                }
                html += "</tr>";
            }
            html += '</table>';

            // compile the provided template against the current scope
            var compiledHtml = $compile(html)(scope);
            element.replaceWith(compiledHtml);
        }
    };
});