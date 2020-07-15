(function () {
  'use strict';

  angular
    .module('app.pages.auth.forgot-password')
    .controller('ForgotPasswordController', ForgotPasswordController);

  /** @ngInject */
  function ForgotPasswordController(api, $scope, Clique, $location, $rootScope, $cookieStore, $http, $window, $state, AuthModel) {
    var vm = this;
    $scope.showProgress = false;
    var appConfig = Clique.configApp();
    $scope.appName = appConfig.appName;
    $scope.appLogo = appConfig.appLogo;
    var templates = [];
    templates.push(appConfig.bgImg);
    templates.push(appConfig.bgImg1);
    templates.push(appConfig.bgImg2);

    getRandomInt(0, 2);
    // var templates = [
    //   'assets/images/backgrounds/registerbackground/forgetpassword1.jpg',
    //   'assets/images/backgrounds/registerbackground/forgetpassword2.jpg',
    //   'assets/images/backgrounds/registerbackground/forgetpassword3.jpg',
    //   'assets/images/backgrounds/registerbackground/new4.jpg',
    //   'assets/images/backgrounds/registerbackground/new5.jpg',
    //   'assets/images/backgrounds/registerbackground/new6.jpg',
    /*'assets/images/backgrounds/registerbackground/1.jpg',
    'assets/images/backgrounds/registerbackground/2.jpg',
    'assets/images/backgrounds/registerbackground/3.jpg',
    'assets/images/backgrounds/registerbackground/4.jpg',
    'assets/images/backgrounds/registerbackground/5.jpg',
    'assets/images/backgrounds/registerbackground/6.jpg',
    'assets/images/backgrounds/registerbackground/7.jpg',*/
    // ];

    function getRandomInt(min, max) {
      $scope.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //alert(templates[2])
    $scope.backGroundImage = templates[$scope.randomNumber];
    $scope.submit = function () {

      $scope.showProgress = true;





      //Clique.ClearCredentials();
      var Params = {
        email: vm.form.email
      }
      $scope.promise = AuthModel.ForgetPassword(Params);
      $scope.promise.then(function (response) {
        if (response.statuscode == 0) {
          $scope.showProgress = false;
          Clique.showToast(response.statusmessage, 'bottom right', "success");
          $state.go("app.pages_auth_login-v2");
        } else {
          Clique.showToast(response.statusmessage, 'bottom right', "error");
          $scope.showProgress = false;
        }
      });
    }
  }
})();
