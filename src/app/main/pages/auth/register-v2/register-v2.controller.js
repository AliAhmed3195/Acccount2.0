(function () {
  'use strict';

  angular
    .module('app.pages.auth.register-v2')
    .controller('RegisterV2Controller', RegisterV2Controller)
    .directive('passwordStrength', [
      function () {
        return {
          require: 'ngModel',
          restrict: 'E',
          scope: {
            password: '=ngModel'
          },

          link: function (scope, elem, attrs, ctrl) {
            scope.$watch('password', function (newVal) {



              scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                isSatisfied(newVal && /[A-z]/.test(newVal)) +
                isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                isSatisfied(newVal && /\d/.test(newVal));
              scope.pattrColor = {
                minlength: scope.strength >= 2 ? "green" : "black",
                special: scope.strength >= 3 ? "green" : "black"
              }

              function isSatisfied(criteria) {
                //console.log(criteria);		
                return criteria ? 1 : 0;
              }
            }, true);
          },
          template: '<br/><br/><div ng-show="strength" ng-hide="strength==4"><md-progress-linear md-mode="determinate" class="md-accent md-hue-2" value="{{strength >= 1 ? strength*25 : 0}}"></md-progress-linear><div><p>Valid Password Pattern:</p><ul><li>Min length 8</li><li>Special Character</li><li>Digit</li><li>Capital Letter</li></ul></div></div>'
        }
      }
    ])
    .directive('patternValidator', [
      function () {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

              var patt = new RegExp(attrs.patternValidator);

              var isValid = patt.test(viewValue);

              ctrl.$setValidity('passwordPattern', isValid);

              // angular does this with all validators -> return isValid ? viewValue : undefined;
              // But it means that the ng-model will have a value of undefined
              // So just return viewValue!
              return viewValue;

            });
          }
        };
      }
    ]);


  /** @ngInject */
  function RegisterV2Controller(api, $scope, Clique, $location, $rootScope, $cookieStore, $http, $window, $state, AuthModel, $timeout) {
    var vm = this;
    $scope.showProgress = false;
    $scope.disableField = false;
    $scope.showRegisterPage = false;
    var appConfig = Clique.configApp();
    $scope.appName=appConfig.appName;
    $scope.appLogo=appConfig.appLogo;
    $scope.termAndConditions =appConfig.termAndConditions ;
    var templates = [];
    templates.push(appConfig.bgImg);
    templates.push(appConfig.bgImg1);
    templates.push(appConfig.bgImg2);


    //$scope.email = '';
    //$scope.company = '';
    //$scope.phone = '';
    //vm.form.phone = '';
    //vm.form.phone='5555';
    $scope.randomNumber = 1;
    $scope.testDrive = false;
    $scope.billCustomer = false;
    $scope.invoicingApp = false;
    getRandomInt(0, 2);
    // var templates=[
    // 				'assets/images/backgrounds/registerbackground/new1.jpg',
    // 				'assets/images/backgrounds/registerbackground/new2.jpg',
    // 				'assets/images/backgrounds/registerbackground/new3.jpg',
    /*'assets/images/backgrounds/registerbackground/new4.jpg',
    'assets/images/backgrounds/registerbackground/new5.jpg',
    'assets/images/backgrounds/registerbackground/new6.jpg',
    'assets/images/backgrounds/registerbackground/1.jpg',
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
    var bgImage = new Image();
    bgImage.src = $scope.backGroundImage;
    bgImage.onload = function () {
      $timeout(function () {
        $scope.showRegisterPage = true;
      }, 900);

    }
    if ($scope.randomNumber == 0) {
      $scope.testDrive = true;
    }
    if ($scope.randomNumber == 1) {
      $scope.billCustomer = true;
    }
    if ($scope.randomNumber == 2) {
      $scope.invoicingApp = true;
    }
    /* if($scope.randomNumber==5)
     {
    	$scope.billcustomer2 = true; 
     }*/
    //////////////////////////////////////////////////////////
    ////////// If someone invite to join Clique//////////////
    var searchObject = $location.search();
    if ((searchObject.ref_id != null) && (searchObject.email != null)) {
      $http.defaults.headers.common['Authorization'] = "Token " + searchObject.ref_id;
      $scope.disableField = true;

      $http({
        method: 'GET',
        url: api.baseUrl + api.version + 'company',
        //url:"http://192.168.1.100:8000/v1/company"
        //params: {token: searchObject.token}
      }).then(function successCallback(response) {

        var response_data = response.data.data;
        //console.log(response_data.company.name);
        if (response.statusmessage != "Failed") {
          vm.form = {
            company: response_data.company.name,
            email: searchObject.email,
            phone: response_data.company.phone,
            refid: searchObject.token
          };
        } else {
          Clique.showToast(response.statusText, 'bottom right', 'error');
          vm.showProgress = false;
        }
      }, function errorCallback(response) {
        Clique.showResponseError(response);
      });




      // $scope.form.phone = '123'
      //vm.form.phone = '123456';


    } else {
      vm.form = {
        refid: "null"
      };

    }



    $scope.ph_numbr = /^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
    $scope.submit = function () {

      $scope.showProgress = true;

      //Clique.ClearCredentials();
      if (vm.form.refid == "null") {
        var Params = {
          username: vm.form.username,
          password: vm.form.password,
          email: vm.form.email,
          confirm_password: vm.form.passwordConfirm,
          phone: vm.form.phone,
          company: vm.form.company
        }
      } else {
        var Params = {
          username: vm.form.username,
          password: vm.form.password,
          email: vm.form.email,
          confirm_password: vm.form.passwordConfirm,
          phone: vm.form.phone,
          company: vm.form.company,
          ref_id: vm.form.refid
        }

      }

      $scope.promise = AuthModel.Signup(Params);
      $scope.promise.then(function (response) {
        if (response.statuscode == 0) {
          $window.location.assign('/apps/dashboard');
          Clique.showToast(response.statusmessage, 'bottom right', "success");
        } else {
          $scope.showProgress = false;
          Clique.showToast(response.statusmessage, 'bottom right', "error");
        }
      });

      //console.log(Params);
      //return false;
      /*api.account.signup.
                  save(
						   {},
						   Params,
	
						   function (response){
							$scope.showProgress=false;  
							if(response.statuscode==0)
							{
								Clique.showToast(response.statusmessage,'bottom right',"success");
								console.log(response);
								$window.location.assign('/apps/dashboard');
							}
							else
							{
								Clique.showToast(response.statusmessage,'bottom right',"error");	
							}
							//$state.go("app.pages_auth_login-v2");
						  },
						  function (response){
							Clique.showToast(response.status+':'+response.statusText,'bottom right','error');
							$scope.showProgress=false;
						  }
                      );*/
    }

    /*$scope.v=function(){
    			return test(vm.form.password);
  			};
			var tests = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^A-Z-0-9]/i]
			function test(pass){
			  if(pass == null)
				return -1;
			  var s = 0;
			  if(pass.length<=9)
				return 0;
			  for(var i in tests)
				if(tests[i].test(pass))
				  s++
			  return s;
			}	*/
  }




})();
