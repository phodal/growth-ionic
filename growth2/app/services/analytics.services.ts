import {Injectable} from "@angular/core";
import {GoogleAnalytics} from "ionic-native/dist/index";

@Injectable()
export class AnalyticsServices {

  constructor() {
  };

  initID() {
    GoogleAnalytics.startTrackerWithId("UA-71907748-1");
  }

  trackView(view) {
    if (window.cordova) {
      this.initID();
      GoogleAnalytics.trackView(view);
    } else {
      /* tslint:disable */
      console.log("Analytics Track: " + view);
      /* tslint:enable */
    }
  }

  trackEvent(category, action) {
    if (window.cordova) {
      this.initID();
      GoogleAnalytics.trackEvent(category, action);
    } else {
      /* tslint:disable */
      console.log("Analytics Event: " + category + " Action: " + action);
      /* tslint:enable */
    }
  }

}
