'use strict';

angular.module('patientPortalApp')
//.constant("baseURL", "https://rest-server-patientportal.azurewebsites.net/")
.constant("baseURL", "https://peaceful-lake-93230.herokuapp.com/")
//.constant("baseURL", "https://localhost:4443/")

//profileFactory
.factory('profileFactory', ['$localStorage', '$resource', 'baseURL', function ($localStorage, $resource, baseURL) {
   
    return $resource(baseURL + "patients/:id", null, {
            'update': {
                method: 'PUT'
            }
        
        });
    
    
}])

//visitFactory
.factory('visitFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "visits/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

//testFactory
.factory('testFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "tests/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

//messageFactory
.factory('messageFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "messages/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

//medicationsFactory
.factory('medicationsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "medications/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

//insuranceFactory
.factory('insuranceFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "insurance/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

//billingFactory
.factory('billingFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "bills/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
//localStorage methods
.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])

//AuthFactory - handles login and registration
.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL',  function($resource, $http, $localStorage, $rootScope, $window, baseURL){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    var patient = {};

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
    patient = credentials.patient;
    // Set the token as header for your requests!
      console.log(patient);
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
    $localStorage.remove('patientinfo');
    $window.location.href = '/app/index.html'
  }
    
    authFac.updateProfile = function(patient) {
        
        $resource(baseURL + "users/register")
        .put(patient,
           function(response) {
                   console.log(response);
              $rootScope.$broadcast('profileUpdate:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Profile Update Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                //ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
            console.log(response);
              storeUserCredentials({username:loginData.username, token: response.token, patient: response.patient});
            $localStorage.storeObject('patientinfo', response.patient);
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
            if(response==null || response.data==null){
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                //ngDialog.openConfirm({ template: message, plain: 'true'});
            }
            else{
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                //ngDialog.openConfirm({ template: message, plain: 'true'});
            }
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    

    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])
;