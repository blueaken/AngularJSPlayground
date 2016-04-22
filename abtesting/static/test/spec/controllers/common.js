'use strict';

describe('Controller: DatepickerCtrl', function () {

  // load the controller's module
  beforeEach(module('nvaApp'));

  var DatepickerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      DatepickerCtrl = $controller('DatepickerCtrl', {
      $scope: scope
    });
  }));

  //it('should assigns a Date to the dt', function () {
  //    expect(scope.dt).toBe.an.instanceOf(Date);
  //});

    it('should attach a list of attributeTypes to the create variance scope', function () {
        expect(scope.attributeTypes.length).toBe(3);
    });
});
