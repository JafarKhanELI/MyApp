(function () {
    "use strict";

    angular.module("myApp")
        .controller("mainCtrl", ["userAccount", "requests", "myServices","$route", mainCtrl]);

    function mainCtrl(userAccount, requests, myServices,$route) {
       
        console.log('Inside main controller');
        var vm = this;
        vm.message = "";
        vm.filter = "";
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.link = {
        };
        vm.createLink = {
        };

        vm.getList = function () {
            requests.query({
                $filter: "contains(Name, '" + vm.filter + "') or contains(Description, '" + vm.filter + "') or contains(Address, '" + vm.filter + "')"
            }, function (data) { vm.links = data }, function (response) { vm.message = response.statusText; });
        };
        vm.getList();
        //" + vm.filter +"
        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;
            vm.userData.userName = "TestUser";
            userAccount.registration.registerUser(vm.userData, function (data) {
                vm.userData.confirmPassword = "";
                vm.message = "Registration is success full";
                vm.loginUser();},
                    function (response) {
                    vm.message = response.statusText + "\r\n";
                    });
            };

        vm.loginUser = function () {
            vm.message = "Loged in User : " + vm.userData.email;
        };



        vm.edit=function (id)
            {
            requests.get({ id: id }, function (data) {
                myServices.set(data);
                vm.link = data;
                window.location.href = '#editlink';
            },
             function (response) { vm.message = response.statusText; }
            );
        }

        vm.update=function()
        {
            vm.link.$update({ id: vm.link.id }, function (data) {
                console.log('Updated link : ' + vm.link.name);
                window.location.href = '#';
                vm.getList();
            }, function (response) { vm.message = response.statusText; });
        }

        vm.create = function ()
        {
            console.log('Create new link: '+ vm.createLink.name);
            requests.create(vm.createLink, function (data) {
                console.log('New link created with ID : ' + data.id);
                vm.createLink = {};
                    window.location.href = '#';
                    vm.getList();
            }, function (response) { vm.message = response.statusText; });

        }

        vm.delete = function(id)
        {
            console.log("Deleting link with id : " + id);
            requests.deleteLink({ id: id }, function (data) {
                console.log("Deleted link with id : " + data.id);
                vm.getList();
            }, function (response) { vm.message = response.statusText; });

        }

        vm.search = function () {
            if (vm.filter == undefined)
                vm.filter = "";
            vm.getList();
        }
    }

}());