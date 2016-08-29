(function () {
    "use strict";

    angular.module("commonServices",["ngResource"])
        .constant("appSettings",
        {
            serverPath: "http://localhost:60386"
        })

        .factory("userAccount", ["$resource", "appSettings", userAccount])
    ;

    function userAccount($resource, appSettings) {
                return {

            registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                    {
                        'registerUser': { method: 'POST' }
                    }),


            login: $resource(appSettings.serverPath + "/Token", null,
                    {
                        'loginUser': {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (data, headersGetter) {
                                var str = [];
                                for (var d in data)
                                    str.push(encodeURIComponent(d) + "=" +
                                                        encodeURIComponent(data[d]));
                                return str.join("&");
                            }

                        }
                    })
        }
    };

   

}());