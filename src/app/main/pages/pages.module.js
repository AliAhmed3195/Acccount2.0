(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            //'app.pages.auth.login',
            'app.pages.auth.login-v2',
            //'app.pages.auth.register',
            'app.pages.auth.register-v2',
            'app.pages.auth.forgot-password',
            //'app.pages.auth.reset-password',
            'app.pages.auth.lock'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('pages', {
            title : 'PAGES',
            group : true,
            weight: 2
        });
    }
})();