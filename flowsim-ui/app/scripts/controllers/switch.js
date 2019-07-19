'use strict';

/**
 * @ngdoc function
 * @name flowsimUiApp.controller:SwitchCtrl
 * @description
 * # SwitchCtrl
 * Controller of the flowsimUiApp
 */
angular.module('flowsimUiApp')
  .controller('SwitchCtrl', function ($scope, $state, switchList, fgCache, Profile, Switch,
                                      $rootScope, $modal, Regex, $http,$route, $location
									  ) {
    $scope.names = {};
	var str3;
	var flowId;
	var deviceId;
    $scope.device = null;
    $scope.getSwitches = function(callback) {
      _(switchList).each(function(swi){
        $scope.names[swi] = true;
      });
      callback(null, switchList);
    };
    
	 $scope.getOnos = function() {
			     
			 $http({
                   url : "http://10.177.125.6:8181/onos/v1/devices",
				   data: {"username": "onos", "password": "rocks"},
                  method : 'GET',
                 headers : {
                       
                  // Authorization: 'Basic b25vczpyb2Nrcw=='
                   }
					}).success(function(response){
						console.log(response);
						$scope.greeting = response.devices;
					}).error(function(error){
						console.log(error);
						alert("login error");
					})
	
	};
       $scope.selectedRowShow = function(value) {
					   console.log(value);
		   deviceId = value;
		   var str1="of%3A";
                   var str2 = value;
                   str3 = str1.concat(str2.substr(3));
                   console.log(str3);
			localStorage.setItem('deviceId', str3);
			$location.path('/flows');
                        //$location.path('/fgtabs');

			$route.reload();
                  
 	};	
	
	
	
	$scope.selectedFlowShow = function(value) {
		   console.log(value);
		   flowId = value;
		   console.log(flowId);
	};
	
	
	
	   $scope.getFlows = function() {
		  
			var deviceId= localStorage.getItem('deviceId');
			     
			var urll = "http://10.177.125.6:8181/onos/v1/flows/".concat(deviceId);
			console.log(urll);	
			 $http({
				 
                   url : urll,
				//   data: {"username": "onos", "password": "rocks"},
                  method : 'GET',
                 headers : {    
                  // Authorization: 'Basic b25vczpyb2Nrcw=='
                   }
					}).success(function(data){
						console.log(data.flows);
						$scope.flows = data.flows;
						alert("Flows for DeviceId : " + deviceId);
					}).error(function(error){
						console.log(error);
						alert("Error in getting Flows");
					})
	}; 
	
	$scope.deleteFlows = function() {
			var deviceId= localStorage.getItem('deviceId');
			var deleteUrl = ((("http://10.177.125.6:8181/onos/v1/flows/".concat(deviceId)).concat("/")).concat(flowId));
			console.log(deleteUrl);	
			 $http({
				 
                   url : deleteUrl,
				//   data: {"username": "onos", "password": "rocks"},
                  method : 'DELETE',
                 headers : {    
                   Authorization: 'Basic b25vczpyb2Nrcw=='
                   }
					}).success(function(data) {
						alert("Flow Deleted with DeviceId :" + deviceId + " and flowId : " + flowId);
					}).error(function(error){
						console.log(error);
						alert("Error in Deleting Device");
					})
	}; 
	$scope.addFlows = function() {
			
			var addUrl = ((("http://10.177.125.6:8181/onos/v1/flows/".concat(str3)).concat("?")).concat("appId=org.onosproject.segmentrouting"));
			console.log(addUrl);	
			 $http({
				 
                   url : addUrl,
				   data: {"username": "onos", "password": "rocks"},
                  method : 'POST',
                 headers : {    
                   Authorization: 'Basic b25vczpyb2Nrcw=='
                   }
					}).success(function(data) {
						alert("Added");
					}).error(function(error){
						console.log(error);
						alert("Error in Deleting Device");
					})
	}; 
	
	
    $scope.addSwitch = function(name, callback) {
      if(name in $scope.names) {
        callback('Name exists');
      } else if(!Regex.Identifier.test(name)) {
        callback('Invalid name');
      } else {
        fgCache.getNames('profile', function(err, result) {
          if(err) {
            console.log(err.details);
          } else {
            $modal.open({
              templateUrl: 'views/dialog/switch.html',
              controller: 'DialogSwitchCtrl',
              size: 'sm',
              resolve: {
                profiles: function () {
                  return result;
                }
              }
            }).result.then(function(profileName) {
              fgCache.get('profile', profileName, Profile, function(err, result) {
                if(err) {
                  console.log(err.details);
                } else {
                  $scope.device = fgCache.create('switch', name, Switch, result);
                  $scope.names[name] = true;
                  $scope.setDirty();
				  
                  callback(null);
                }
              });
            });
          }
        });
      }
    };

    $scope.delSwitch = function(name) {
      fgCache.destroy('switch', name);
      if(fgCache.isDirty()) {
        $scope.setDirty();
      } else {
        $scope.setClean();
      }
      delete $scope.names[name];
    };

    $scope.setSwitch = function(name) {
      if(name === undefined) {
        $scope.device = null;
        $scope.$broadcast('setSwitch', null);
      } else {
        fgCache.get('switch', name, Switch, function(err, result) {
          if(err) {
            console.log(err.details);
          } else {
            $scope.device = result;
            $scope.tabs.datapath.active = true;
            $state.go('switch.editor.datapath');
            $scope.$broadcast('setSwitch');
          }
        });
      }
    };

    $scope.tabs = {
      datapath: { active: false },
      ports: {active: false},
      tables: {active: false},
      groups: {active: false},
      meters: {active: false}
    };

    $scope.setDirty = function() {
      if($scope.device){
        $scope.device.dirty = true;
      }
      $rootScope.$broadcast('dirtyCache');
    };

    $scope.setClean = function() {
      $rootScope.$broadcast('cleanCache');
    };

    $scope.$on('$destroy', function(){
      $scope.names = {};
      $scope.device = null;
    });

  });