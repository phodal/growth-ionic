AppVersionProxy = {
  getVersionNumber: function (successCallback, failCallback, args) {
    var version = Windows.ApplicationModel.Package.current.id.version;
    successCallback([version.major, version.minor, version.build, version.revision].join('.'));
  },
  getAppName: function (successCallback, failCallback, args) {
    var name = Windows.ApplicationModel.Package.current.displayName;
    successCallback(name);
  },
  getPackageName: function (successCallback, failCallback, args) {
    var name = Windows.ApplicationModel.Package.current.id.name;
    successCallback(name);
  },
  getVersionCode: function (successCallback, failCallback, args) {
    var build = Windows.ApplicationModel.Package.current.id.version.build;
    successCallback(build);
  }
};
cordova.commandProxy.add("AppVersion", AppVersionProxy);
