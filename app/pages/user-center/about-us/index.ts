import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular/index";
import {Profile} from "./profile/index";
import {AppVersion} from "ionic-native/dist/index";
import {AnalyticsServices} from "../../../services/analytics.services";
import {openLink} from "../../../utils/helper";

@Component({
  templateUrl: "build/pages/user-center/about-us/index.html",
  providers: [AnalyticsServices]
})

export class AboutUsPage {
  private contributors;
  private version;

  constructor(public nav:NavController, private analytics:AnalyticsServices) {
    this.nav = nav;
    this.contributors = CONTRIBUTORS;
    this.init();
    this.analytics.trackView("User Center: About Us");
  }

  openProfilePage(num) {
    this.nav.push(Profile, {num: num});
  }

  openUrl(url) {
    openLink(url);
  }

  private init() {
    if (window.cordova) {
      let self = this;
      AppVersion.getVersionNumber().then(
        version => self.version = version
      );
    }
  }
}
