


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



function getBookingAgeInDays(bookingDateInMs) {

    var onDayInMillisecounds = (24*60*60*1000)
    var currentDate = new Date()
    
    if(currentDate.getTime() <= bookingDateInMs)
    {
        return 0
    }
    
    var inUseForDays = Math.round(Math.abs((currentDate.getTime() - bookingDateInMs) / onDayInMillisecounds))
    return inUseForDays
}



function prepareBookingDate(vm) {
    if(vm.status == "free")
    {
        vm.bookingDate = ''
        vm.inUseForDays = ''
    }
    else
    {
        vm.bookingDate = Date.parse(vm.bookingtime)
        vm.inUseForDays = getBookingAgeInDays(vm.bookingDate)
    }
}



app.controller('vmListController', function(config, $scope, $http, $modal){ 
  $http.get(config.endpoint+'vms').then(function(result) {
    vms = result.data.vms

    for(var i=0; i<vms.length; i++)
    {
        prepareBookingDate(vms[i])
    }
    
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

        var currentDate = new Date()
        vm.bookingtime = currentDate.toString()
        
        prepareBookingDate(vm)
        
        $scope.vms[id].host = vm.host
        $scope.vms[id].status = vm.status
        $scope.vms[id].description = vm.description
        $scope.vms[id].contact = vm.contact
        $scope.vms[id].systeminfo = vm.systeminfo
        $scope.vms[id].bookingDate = vm.bookingDate
        $scope.vms[id].bookingtime = vm.bookingtime
        $scope.vms[id].inUseForDays = vm.inUseForDays

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
    "contact": selectedVM.contact,
    "systeminfo": selectedVM.systeminfo
  };

  $scope.save = function () {
    $scope.selectedVM
    $modalInstance.close($scope.vm)
  }

  $scope.close = function () {
    $modalInstance.dismiss('cancel')
  }
});
