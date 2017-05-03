import {Injectable} from "@angular/core";
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {Platform} from "ionic-angular";

@Injectable()
export class AnalyticsServices {
  constructor(public platform: Platform, private ga: GoogleAnalytics) {

  };

  initID() {
    this.ga.startTrackerWithId("UA-71907748-1");
  }

  trackView(view) {
    this.initID();
    this.ga.trackView(view);
    /* tslint:disable */
    console.log("Analytics Track: " + view);
    /* tslint:enable */
  }

  trackEvent(category, action) {
    this.initID();
    this.ga.trackEvent(category, action);
    /* tslint:disable */
    console.log("Analytics Event: " + category + " Action: " + action);
    /* tslint:enable */
  }

}
