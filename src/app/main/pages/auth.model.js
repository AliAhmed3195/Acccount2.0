(function () {
    'use strict';

    angular
    .module('app.pages')
    .factory('AuthModel', AuthModel);

    AuthModel.$inject = ['$http','Clique'];
    function AuthModel($http,Clique) {
        var service = {};

        service.Login = Login;
        service.Signup = Signup;
        service.ForgetPassword = ForgetPassword;
    

        return service;

        function Login(params) {
            return Clique.callService('post','/account/login',params).then(handleSuccess, handleError);
        }
        function Signup(params) {
            return Clique.callService('post','/account/signup',params).then(handleSuccess, handleError);
        }
        function ForgetPassword(params) {
            return Clique.callService('post','/account/forget',params).then(handleSuccess, handleError);
        }
        function changePassword(params) {
            return Clique.callService('post','/account/changepassword/',params).then(handleSuccess, handleError);
        }

       
        // private functions

        function handleSuccess(res) {
            //console.log(res);
            return res.data;
        }

        function handleError(error) {
            //console.log(error);
            return error;
        }
    }

})();
