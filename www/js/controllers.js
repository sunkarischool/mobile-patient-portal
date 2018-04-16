'use strict';

angular.module('patientPortalApp')


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform,
     $cordovaCamera, $cordovaImagePicker) {

  // setting up
  $scope.loginData = $localStorage.getObject('userinfo','{}');
 
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };
  
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);     
    $localStorage.storeObject('userinfo',$scope.loginData);
    // Simulation!!!
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
})

//filters that are used to display dataa in certain format
//DateFormat to display the date in MMM dd, yyyy format
.filter('myDateFormat', function myDateFormat($filter){
      return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "MMM dd, yyyy");
      }
 })

//yesNo filter to display the Boolean value as Yes or No
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
})

//Controllers to handle the functionality behind various pages
//ProfileController - handles profile page
.controller('ProfileController', ['$scope', 'profileFactory', 'AuthFactory','$stateParams', '$localStorage', function ($scope, profileFactory, AuthFactory, $stateParams, $localStorage ) {

    $scope.showProfile = false;
    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.showProfile = true;
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    
}])

//VisitController handles patient's visits to the doctor
.controller('VisitController', ['$scope', '$state', '$stateParams', 'visitFactory', '$localStorage',  function ($scope, $state, $stateParams, visitFactory, $localStorage) {

    $scope.message = "Loading ...";
    
    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
        
    var visits = visitFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.visits = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//TestController handles patient's visits to the doctor
.controller('TestController', ['$scope', '$state', '$stateParams', 'testFactory', '$localStorage',  function ($scope, $state, $stateParams, testFactory, $localStorage) {

    $scope.message = "Loading ...";
    
    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
        
    var tests = testFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.tests = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//BillingController handles billing to insurance
.controller('BillingController', ['$scope', '$state', '$stateParams', 'billingFactory', '$localStorage',  function ($scope, $state, $stateParams, billingFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var bills = billingFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.bills = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//InsurancesController handles insurance related information
.controller('InsurancesController', ['$scope', '$state', '$stateParams', 'insuranceFactory', '$localStorage',  function ($scope, $state, $stateParams, insuranceFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var insurances = insuranceFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.insurances = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//MessagesController handles messages to and from the doctor's office
.controller('MessagesController', ['$scope', '$state', '$stateParams', 'messageFactory', '$localStorage',  function ($scope, $state, $stateParams, messageFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    
    var messages = messageFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.messages = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//MedicationsController handles all the medications prescribed to the patient
.controller('MedicationsController', ['$scope', '$state', '$stateParams', 'medicationsFactory', '$localStorage', function ($scope, $state, $stateParams, medicationsFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var medications = medicationsFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.medications = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

//LoginController handles user login 
.controller('LoginController', ['$scope', '$localStorage', 'AuthFactory', function ($scope, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        //ngDialog.close();

    };
            
    
    
}])

;