


var app = angular.module('vm-reservation', ['ngRoute', 'ngResource', 'ui.bootstrap'])



app.constant('config', {
  'endpoint': 'http://trident.vm-intern.epages.com:3000/'
});



app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'vms.htm',
      controller  : 'vmListController'
    })
});	



app.controller('vmListController', function(config, $scope, $http, $modal){ 
  $http.get(config.endpoint+'vms').then(function(result) {
    vms = result.data.vms

    $scope.vms = vms

    $scope.edit = function (id) {
      var vm = vms[id]

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'edit.htm',
        controller: 'editVMController',
        resolve: {
          selectedVM: function () {
            return vm
          }
        }
      })

      modalInstance.result.then(function (vm) {
        $scope.vms[id].host = vm.host
        $scope.vms[id].status = vm.status
        $scope.vms[id].description = vm.description
        $scope.vms[id].contact = vm.contact

        $http.put(config.endpoint+'vms/'+id, vm).success(function() {
          console.log("update vm: " + vm)
        })
      })

    }

  })
})



app.controller('editVMController', function($scope, $modalInstance, selectedVM) {
  $scope.vm = {
    "id": selectedVM.id,
    "host": selectedVM.host,
    "status": selectedVM.status,
    "description": selectedVM.description,
    "contact": selectedVM.contact
  };

  $scope.save = function () {
    $scope.selectedVM
    $modalInstance.close($scope.vm)
  }

  $scope.close = function () {
    $modalInstance.dismiss('cancel')
  }
});
