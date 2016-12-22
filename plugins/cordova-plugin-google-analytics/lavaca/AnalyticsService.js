define(function(require) {

  var Disposable = require('lavaca/util/Disposable');
  var Config = require('lavaca/util/Config');
  var Device = require('lavaca/env/Device');
  var ga = require('google-analytics');

  var AnalyticsService = Disposable.extend(function AnalyticsService() {
    Disposable.call(this);
    this.appId = Config.get('google_analytics_id');
    this.webId = Config.get('google_analytics_web_id');
    this.isWeb = this.webId.length;

    if (!Device.isCordova() && this.isWeb) {
      ga('create', this.webId);
    }

    document.addEventListener('deviceready', this.init.bind(this), false);
  }, {
    ready: false,
    queue: [],
    isWeb: false,
    //isApp: false, //TODO need to research when Device.isCordova() is valid in Lavaca load flow
    init: function() {
      if (Device.isCordova() && analytics) {
        this.ready = true;
        analytics.startTrackerWithId(this.appId);
        this.processQueue();
        this.isWeb = false;
      }
    },
    trackView: function(screen) {
      if (Device.isCordova()) {
        if (this.ready) {
          analytics.trackView(screen);
        } else {
          this.queue.push({
            action: 'trackView',
            params: [screen]
          });
        }
      } else if (this.isWeb) {
        ga('send', 'pageview', {
          'title': screen
        });
      }
    },
    setUserId: function() {
      throw 'setUserId is not implemented for Lavaca';
    },
    setAnonymizeIp: function() {
      throw 'setAnonymizeIp is not implemented for Lavaca';
    },
    setAppVersion: function() {
      throw 'setAppVersion is not implemented for Lavaca';
    },
    debugMode: function() {
      throw 'debugMode is not implemented for Lavaca';
    },
    trackEvent: function(category, action, label, value) {
      action = action || '';
      label = label || '';
      value = value || 0;
      if (Device.isCordova()) {
        if (this.ready) {
          analytics.trackEvent(category, action, label, value);
        } else {
          this.queue.push({
            action: 'trackEvent',
            params: [category, action, label, value]
          });
        }
      } else if (this.isWeb) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': category,
          'eventAction': action,
          'eventLabel': label,
          'eventValue': value
        });
      }
    },
    trackTiming: function(category, intervalInMilliseconds, name, label) {
      action = action || '';
      label = label || '';
      value = value || 0;
      if (Device.isCordova()) {
        if (this.ready) {
          analytics.trackTiming(category, intervalInMilliseconds, name, label);
        } else {
          this.queue.push({
            action: 'trackTiming',
            params: [category, intervalInMilliseconds, name, label]
          });
        }
      } else if (this.isWeb) {
        ga('send', {
          'hitType': 'timing',
          'timingCategory': category,
          'timingValue': intervalInMilliseconds,
          'timingVar': name,
          'timingLabel': label
        });
      }
    },
    processQueue: function() {
      if (this.queue) {
        var emptyFunction = function() {};
        for (var i = 0; i < this.queue.length; ++i) {
          cordova.exec(emptyFunction, emptyFunction,
            'UniversalAnalytics', this.queue[i].action, this.queue[i].params);
        }
      }
    }
  });

  return new AnalyticsService();
});
