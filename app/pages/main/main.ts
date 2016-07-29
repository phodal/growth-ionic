import {NavController, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {Section} from "./section/index";
import {AnalyticsServices} from "../../services/analytics.services";

@Component({
  templateUrl: "build/pages/main/main.html",
  providers: [AnalyticsServices]
})
export class MainView {
  private shownGroup = false;

  constructor(public nav:NavController, private platform:Platform, private analytics:AnalyticsServices) {
    this.nav = nav;
    this.platform = platform;
    this.analytics.trackView("Growth 2.0");
  }

  openSectionDetailsPage(section) {
    this.analytics.trackEvent('Section', 'section:' + section);
    this.nav.push(Section, {section: section});
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
