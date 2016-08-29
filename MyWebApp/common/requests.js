"use strict";

angular.module("commonServices")

    .factory("requests", ["$resource", "appSettings", requests]
    )
.factory("myServices",[myServices]);


function requests($resource, appSettings)
{
    return $resource(appSettings.serverPath + "/api/links/:id", null, {
        "get": { header: {} },
        "create": { method:"post",header: {} },
        "update": { method: "PUT", header: {} },
        "deleteLink": { method: "Delete", header: {} }
       
    });
}



function myServices()
{
    var savedData = {};
    function set(data)
    {
        savedData = data;
    };

    function get()
    {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

}