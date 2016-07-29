import {Component} from "@angular/core";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "build/pages/user-center/license/index.html",
  providers: [AnalyticsServices]
})
export class LicensePage {
  constructor(private analytics:AnalyticsServices) {
    this.analytics.trackView("User Center: License");
  }

  launchUrl(url) {
    window.open(url, "_system", "location=yes");
  }
}
