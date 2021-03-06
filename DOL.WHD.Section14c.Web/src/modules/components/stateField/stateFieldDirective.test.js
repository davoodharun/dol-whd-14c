describe('stateField', function() {
  beforeEach(module('14c'));

  var element, rootScope;
  beforeEach(function() {
    element = angular.element('<state-field/>');
    inject(function($rootScope, $compile, $injector) {
      rootScope = $rootScope;
      injector = $injector;
      $compile(element)(rootScope);
    });
  });

  it('invoke directive', function() {
    rootScope.$digest();
    expect(element).toBeDefined();
  });
});
