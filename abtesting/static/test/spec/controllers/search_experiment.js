'use strict';

describe('Controller: SearchExperimentControl', function () {

  // load the controller's module
  beforeEach(module('nvaApp'));

  var SearchExperimentControl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();
      SearchExperimentControl = $controller('SearchExperimentControl', {
      $scope: scope
    });
  }));

    it('init experiments should be empty', function () {
        expect(scope.experiments.length).toBe(0);
    });
    
});
