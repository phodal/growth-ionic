import {Injectable} from "@angular/core";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import {Platform} from "ionic-angular";

@Injectable()
export class AnalyticsServices {
  private ga: GoogleAnalytics;

  constructor(public platform: Platform) {
  };

  initID() {
    this.ga.startTrackerWithId("UA-71907748-1");
  }

  trackView(view) {
    if (this.platform.is('cordova')) {
      this.initID();
      this.ga.trackView(view);
    } else {
      /* tslint:disable */
      console.log("Analytics Track: " + view);
      /* tslint:enable */
    }
  }

  trackEvent(category, action) {
    if (this.platform.is('cordova')) {
      this.initID();
      this.ga.trackEvent(category, action);
    } else {
      /* tslint:disable */
      console.log("Analytics Event: " + category + " Action: " + action);
      /* tslint:enable */
    }
  }

}
