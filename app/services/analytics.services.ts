import {Injectable} from "@angular/core";
import {GoogleAnalytics} from "ionic-native/dist/index";

@Injectable()
export class AnalyticsServices {
  private analytics;

  constructor() {
    this.analytics = new GoogleAnalytics();
  };

  initID() {
    this.analytics.startTrackerWithId('UA-71907748-1');
  }

  trackView(view) {
    if (window.cordova) {
      this.initID();
      this.analytics.trackView(view)
    } else {
      console.log('Analytics Track: ' + view);
    }
  }

  trackEvent(category, action) {
    if (window.cordova) {
      this.initID();
      this.analytics.trackEvent(category, action)
    } else {
      console.log('Analytics Event: ' + category + ' Action: ' + action);
    }
  }

}
