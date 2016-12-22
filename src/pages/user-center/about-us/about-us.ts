import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular";
import {AnalyticsServices} from "../../../services/analytics.services";
import {Helper} from "../../../utils/helper";
import {Profile} from "./profile/profile";

@Component({
  templateUrl: "about-us.html",
  providers: [AnalyticsServices, Helper]
})

export class AboutUsPage {
  private contributors;

  constructor(public nav:NavController, private analytics:AnalyticsServices, public helper: Helper) {
    this.nav = nav;
    this.contributors = CONTRIBUTORS;
    this.analytics.trackView("User Center: About Us");
  }

  openProfilePage(num) {
    this.nav.push(Profile, {num: num});
  }

  openUrl(url) {
    this.helper.openLink(url);
  }
}
