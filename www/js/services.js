angular.module('starter.services', ['ngCordova'])
  .factory('$storageServices', ['$cordovaPreferences', '$window', function ($cordovaPreferences, $window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, cb) {
        cb($window.localStorage[key]);
      }
    };
  }])

  .factory('$analytics', ['$window', function ($window) {
    if (typeof $window.analytics === 'undefined') {
      return {
        trackView: function (view) {
          console.log('Analytics Track: ' + view);
        },
        trackEvent: function (event) {
          console.log('Analytics Track Event: ' + event);
        }
      }
    }

    return {
      init: function () {
        $window.analytics.startTrackerWithId('UA-71907748-1');
      },
      trackView: function (view) {
        this.init();
        $window.analytics.trackView(view)
      },
      trackEvent: function (category, action, label) {
        $window.analytics.trackEvent(category, action, label);
      }
    };
  }])
  .factory('$updateServices', ['$http', '$cordovaAppVersion', '$ionicPopup', '$timeout', '$ionicLoading', '$cordovaFileTransfer', '$cordovaFileOpener2', '$cordovaToast', '$window', '$analytics', function ($http, $cordovaAppVersion, $ionicPopup, $timeout, $ionicLoading, $cordovaFileTransfer, $cordovaFileOpener2, $cordovaToast, $window, $analytics) {

    var Update = {
      check: function (view) {
        if (!$window.cordova) {
          return;
        }
        var url = 'http://www.growth.ren/version.json';
        $http.get(url).success(function (res) {
          var serveAppVersion = res.version;
          if ($cordovaAppVersion === undefined) {
            return;
          }
          $cordovaAppVersion.getVersionNumber().then(function (version) {
            if (parseFloat(version) < parseFloat(serveAppVersion)) {
              showUpdateConfirm(res);
            } else {
              if (view !== 'main') {
                $cordovaToast.showLongCenter('当前版本是最新的！=^_^=');
              }
            }
          });
        }).error(function (response) {
          console.log(response);
        })
      }
    };
    var showUpdateConfirm = function (data) {
      var confirmPopup = $ionicPopup.confirm({
        title: '升级到最新版本：v' + data.version,
        template: data.info, //从服务端获取更新的内容
        cancelText: '取消',
        okText: '升级'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $ionicLoading.show({
            template: "已经下载：0%"
          });

          var url = 'https://s3-ap-southeast-2.amazonaws.com/www.growth.ren/growth.apk'; //可以从服务端获取更新APP的路径
          var targetPath = '/sdcard/Download/Growth.apk'; //APP下载存放的路径，可以使用cordova file插件进行相关配置
          var trustHosts = true;
          var options = {};

          $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
            $analytics.trackView('App Upgrade');
            $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function () {

            }, function (err) {
              alert(err);
            });

            $ionicLoading.hide();
          }, function (err) {
            alert(err);
            $ionicLoading.hide();
          }, function (progress) {
            var downloadProgress;

            $timeout(function () {
              downloadProgress = (progress.loaded / progress.total) * 100;
              $ionicLoading.show({
                template: '已经下载：' + Math.floor(downloadProgress) + '%'
              });
              if (downloadProgress > 99) {
                $ionicLoading.hide();
              }
            })
          });
        }
      });
    };
    return Update;
  }]);
