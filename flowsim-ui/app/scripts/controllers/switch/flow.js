'use strict';

/**
 * @ngdoc function
 * @name flowsimUiApp.controller:SwitchFlowCtrl
 * @description
 * # SwitchFlowCtrl
 * Controller of the flowsimUiApp
 */
angular.module('flowsimUiApp')
  .controller('SwitchFlowCtrl', function ($scope, $http, $modalInstance, flow, caps){

  // Attach the match/instruciton/miss properties
  $scope.priority     = flow.priority;
  $scope.match        = flow.match;
  $scope.instruction  = flow.ins;

  // Set the flow match/action profile/capabilities
  $scope.caps = caps;
  $scope.matchProfiles = caps.match;
  $scope.applyProfiles = caps.instruction.apply;
  $scope.writeProfiles = caps.instruction.write;
var str3="of%3A0000000000000204";
$scope.ok = function () {
  if(!$scope.instruction.meter.isValid()){
    console.log("make a post from here");
	
	var addUrl = ((("http://10.177.125.6:8181/onos/v1/flows/".concat(str3)).concat("?")).concat("appId=org.onosproject.core"));
			console.log(addUrl);	
			 $http({
				 
                   url : addUrl,
				   data: {  
						   "priority": 40000,  
						   "timeout": 0,  
						   "isPermanent": true,  
						   "deviceId": "of:0000000000000204",  
						   "treatment": {  
							 "instructions": [  
							   {  
								 "type": "OUTPUT",  
								 "port": "CONTROLLER"  
							   }  
							 ]  
						   },  
						   "selector": {  
							 "criteria": [  
							   {  
								 "type": "ETH_TYPE",  
								 "ethType": "0x88cc"  
							   }  
							 ]  
						   }  
						 },
                  method : 'POST',
                 headers : {    
                   Authorization: 'Basic b25vczpyb2Nrcw==',
				   
                   }
					}).success(function(data) {
						alert("Added");
					}).error(function(error){
						console.log(error);
						alert("Error in Deleting Device");
					})
	
	
    flow.ins.meter.enabled = false;
  }
  if(!$scope.instruction.goto_.isValid()){
    flow.ins.goto_.enabled = false;
  }
  if(!$scope.instruction.metadata.isValid()){
    flow.ins.metadata.enabled = false;
  }
  $modalInstance.close(flow);
};

$scope.cancel = function () {
  $modalInstance.dismiss('cancel');
};

});
