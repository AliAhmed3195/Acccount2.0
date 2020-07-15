(function () {
  'use strict';

  angular
    .module('app.pages.auth.login-v2')
    .controller('LoginV2Controller', LoginV2Controller);

  /** @ngInject */
  function LoginV2Controller(api, $scope, Clique, $location, $rootScope, $cookieStore, $http, $window, AuthModel, $timeout) {
    // Data
    $scope.showProgress = false;
    var vm = this;
    var appConfig = Clique.configApp();
    $scope.appName=appConfig.appName;
    $scope.appLogo=appConfig.appLogo;
    var templates = [];
    debugger;
    templates.push(appConfig.bgImg);
    // templates.push(appConfig.bgImg1);
    // templates.push(appConfig.bgImg2);

    $scope.randomNumber = 1;
    $scope.testDrive = false;
    $scope.billCustomer = false;
    $scope.invoicingApp = false;
    $scope.showLoginPage = false;
    getRandomInt(0,0);
    // var templates = [
    //   'assets/images/backgrounds/registerbackground/new1.jpg',
    //   'assets/images/backgrounds/registerbackground/new2.jpg',
    //   'assets/images/backgrounds/registerbackground/new3.jpg',
      /*'assets/images/backgrounds/registerbackground/new4.jpg',
      'assets/images/backgrounds/registerbackground/new5.jpg',
      'assets/images/backgrounds/registerbackground/new6.jpg',
      'assets/images/backgrounds/registerbackground/2.jpg',
      'assets/images/backgrounds/registerbackground/3.jpg',
      'assets/images/backgrounds/registerbackground/4.jpg',
      'assets/images/backgrounds/registerbackground/5.jpg',
      'assets/images/backgrounds/registerbackground/6.jpg',
      'assets/images/backgrounds/registerbackground/7.jpg',*/
    // ];

    function getRandomInt(min, max) {
      debugger;
      $scope.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log("TCL: getRandomInt -> $scope.randomNumber", $scope.randomNumber)
    }
    //alert(templates[2])

    //  var el = document.getElementsByClassName("intuitPlatformConnectButton");

    //  var wrappedResult = angular.element(el);


    //  wrappedResult.attr('target', '_blank');
    //  console.log(wrappedResult)


    $scope.launchPopup = function (path) {
     
      var new_url = Clique.getServiceUrl().replace(/v1/g, '');
      // .replace(/v1/g, '');
      // // // console.log('TCL: $scope.launchPopup -> new_url', new_url, path)
      window.location = new_url + path
    }
debugger;

// https://cliquepayments.com/blog/quickbooks-online-status.php

// $scope.backGroundImage = templates[$scope.randomNumber];

$scope.backGroundImage = templates[$scope.randomNumber];
    var bgImage = new Image();
    bgImage.src = $scope.backGroundImage;
    bgImage.onload = function () {
      $timeout(function () {
        debugger;
        $scope.showLoginPage = true;
      }, 900);

    }

    //$scope.backGroundImage ="assets/images/backgrounds/registerbackground/new2.jpg";
    if ($scope.randomNumber == 0) {
      $scope.testDrive = true;
    }
    // if ($scope.randomNumber == 1) {
    //   $scope.billCustomer = true;
    // }
    // if ($scope.randomNumber == 2) {
    //   $scope.invoicingApp = true;
    // }
    /*if($scope.randomNumber==5)
		 {
			$scope.billcustomer2 = true;
		 }*/
    //$scope.freeDemo = true;
    //$scope.showDiv1 = true;
    //alert($scope.randomNumber);
    //$scope.backGroundImage ="assets/images/backgrounds/registerbackground/new1.jpg";


    // $scope.tempalteData = templates[x];
    //////Random Login left Template//////
    //////////////////////////////////////


    // Methods
    $scope.submit = function () {
      $scope.showProgress = true;
      var loginObj = {
        username: vm.form.email,
        password: vm.form.password
      };

      var isCustomer = false;
      $scope.promise = AuthModel.Login(loginObj);
      $scope.promise.then(function (response) {
        if (response.statuscode == 0) {
          isCustomer = response.data.is_customer
          if (isCustomer == true) {
            var new_url = Clique.getServiceUrl().replace(/v1/g, '')
            window.location = new_url + 'apps/customerportal/invoices';
            localStorage.setItem("CUSTOMER_LIST", JSON.stringify(response.data.customerref))
            localStorage.setItem("CURRENT_CUSTOMER", JSON.stringify(response.data.customerref[0]))
            localStorage.setItem("app_id", 2)
            localStorage.setItem("username", response.data.username)
            Clique.showToast(response.statusmessage, 'bottom right', "success");
          } else {
            // $window.location.assign('/apps/dashboard');
            var new_url = Clique.getServiceUrl().replace(/v1/g, '')
            window.location = new_url + 'apps/dashboard';
            Clique.showToast(response.statusmessage, 'bottom right', "success");
          }
        } else {
          $scope.showProgress = false;
          Clique.showToast(response.statusmessage, 'bottom right', "error");
        }
      });
    };
    //////////


  }
})();
