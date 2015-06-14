/*global angular*/
angular.module('GeneradorInformes')
    .constant('BASE_URL', 'http://hita.pro')
    .factory('InformeService', ['BASE_URL', '$http', '$httpBackend', function (BASE_URL, $http, $httpBackend) {
        'use strict';

        try {
            angular.module('ngMockE2E');

            $httpBackend.whenPOST(BASE_URL + '/generar').respond({
                nombre: 'Paco',
                lista: ['Tienes 32 años y tu IMC es de 23, estás en buen estado.',
                        'Como no fumas, tu salud es mejor.',
                        'Deberías hacer más deporte para estar más saludable',
                        'Has obtenido una puntuación de 78 sobre 100']
            });

            $httpBackend.whenGET(function (url) {
                return (url.indexOf('.tpl.html') !== -1);
            }).passThrough();
        } catch (err) {}

        return {
            generar: function (userData) {
                return $http.post(BASE_URL + '/generar', userData);
            }
        };
    }]);
