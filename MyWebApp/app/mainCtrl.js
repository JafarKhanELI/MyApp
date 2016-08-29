(function () {
    "use strict";

    angular.module("myApp")
        .controller("mainCtrl", ["userAccount", "requests", "myServices","$route", mainCtrl]);

    function mainCtrl(userAccount, requests, myServices,$route) {
       
        console.log('Inside main controller');
        var vm = this;
        vm.message = "";
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
            requests.query(function (data) { vm.links = data });
        };
        vm.getList();
        
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
            });
        }

        vm.update=function()
        {
            vm.link.$update({ id: vm.link.id }, function (data) {
                console.log('Updated link : ' + vm.link.name);
                window.location.href = '#';
                vm.getList();
            });
        }

        vm.create = function ()
        {
            console.log('Create new link: '+ vm.createLink.name);
            //vm.createLink.create(function (data) {
            //    console.log('New link created with ID : ' + data.id);
            //    window.location.href = '#';
            //    vm.getList();
            //});

            requests.create(vm.createLink, function (data) {
                console.log('New link created with ID : ' + data.id);
                vm.createLink = {};
                    window.location.href = '#';
                    vm.getList();
            });

            //vm.link.$save(
            //        function (data) {
            //            console.log('New link created with ID : ' + data.id);
            //        },
            //        function (response) {
            //            vm.message = response.statusText + "\r\n";
            //            console.log(response.statusText);
            //        });
        }

        vm.delete = function(id)
        {
            console.log("Deleting link with id : " + id);
            requests.deleteLink({ id: id }, function (data) {
                console.log("Deleted link with id : " + data.id);
                vm.getList();
            });

        }
    }

}());