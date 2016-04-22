'use strict';

describe('Controller: EditVarianceController', function () {

  // load the controller's module
  beforeEach(module('nvaApp'));

  var EditVarianceController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      EditVarianceController = $controller('EditVarianceController', {
      $scope: scope
    });
  }));

  it('should attach a list of attributeTypes to the create variance scope', function () {
    expect(scope.attributeTypes.length).toBe(3);
  });
});
