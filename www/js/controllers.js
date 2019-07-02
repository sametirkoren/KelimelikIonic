angular.module("starter.controllers", [])

  .controller("AppCtrl", function ($scope, $ionicModal, $timeout, $interval) {

    $scope.saniye = 30;
    $scope.hak = 3;
    $scope.skor = 0;
    $scope.isDisabled = true;
    $scope.isHidden = true;

    $scope.goster = function (kelime) {
      $scope.kelime = kelime;
      console.log("Kelimeniz : ", $scope.kelime);
      $scope.bitis = $scope.kelime.substr(-1);
      console.log("Kelimeniz", $scope.bitis, " harfi ile bitiyor.");
      if ($scope.bitis == $scope.kelime.substr(0, 1)) {
        console.log("Doğru bildiniz!");
        $scope.skor += 1;
        angular.element("#skorAnimasyon").addClass("animated bounce");
        angular.element("#border").addClass("dogruBorder");
        angular.element("#dogruCevap").addClass("dogruCevap");
        document.getElementById("fokuslan").value = "";
        var sil = $interval(function () {
          angular.element("#skorAnimasyon").removeClass("animated bounce");
          angular.element("#border").removeClass("dogruBorder");
          angular.element("#dogruCevap").removeClass("dogruCevap");
          $interval.cancel(sil);
        }, 1000);
      } else {
        console.log("Yanlış bildiniz...");
        $scope.skor -= 1;
        $scope.hak -= 1;
        angular.element("#hak").addClass("hakRenk");
        angular.element("#yanlisCevapAnimasyon").addClass("animated shake");
        angular.element("#border").addClass("yanlisBorder");
        document.getElementById("fokuslan").value = "";
        var sil2 = $interval(function () {
          angular
            .element("#yanlisCevapAnimasyon")
            .removeClass("animated shake");
          angular.element("#border").removeClass("yanlisBorder");
          angular.element("#hak").removeClass("hakRenk");
          $interval.cancel(sil2);
        }, 1000);
      }
    };

    $scope.basla = function () {
      console.log("oyun başladı");
      $scope.isDisabled = false;
      angular
        .element("#yanlisCevapAnimasyon")
        .removeClass("animated bounceInLeft");
      angular.element("#skorAnimasyon").removeClass("animated heartBeat");
      angular.element("#opacity").removeClass("modalOpacity");
      $timeout(function () {
        document.getElementById("fokuslan").select();
        document.getElementById("fokuslan").value = "";
      }, 0);
      var sure = $interval(function () {
        $scope.saniye -= 1;
        if ($scope.saniye < 6) {
          angular.element("#sureRenk").addClass("sureRenk");
        }
        if ($scope.saniye == 0 || $scope.hak == 0) {
          console.log("oyun bitti");
          $scope.skorOgren = $scope.skor;
          $interval.cancel(sure);
          $scope.saniye = 30;
          $scope.skor = 0;
          $scope.isDisabled = true;
          $scope.hak = 3;
          document.getElementById("fokuslan").value = "";
          $scope.bitis = "";
          angular.element("#sureRenk").removeClass("sureRenk");
          angular.element("#opacity").addClass("modalOpacity");
          angular.element("#skorGoster").addClass("goster");
          $scope.isHidden = false;

          $scope.kapat = function () {
            angular.element("#skorGoster").removeClass("goster");
            angular.element("#opacity").removeClass("modalOpacity");
            $scope.isHidden = true;
          }
        }
      }, 1000);
    };
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal
      .fromTemplateUrl("templates/login.html", {
        scope: $scope
      })
      .then(function (modal) {
        $scope.modal = modal;
      });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log("Doing login", $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller("AnasayfaCtrl", function ($scope) {

  })

  .controller("PlaylistCtrl", function ($scope, $stateParams) {});
