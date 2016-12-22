import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';

import {Section} from "./section/section";
import {AnalyticsServices} from "../../services/analytics.services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AnalyticsServices]
})

export class HomePage {
  private shownGroup = false;

  constructor(public navCtrl: NavController,  public analytics:AnalyticsServices) {
    this.analytics.trackView("Growth 2.0");
  }

  openSectionDetailsPage(section) {
    this.analytics.trackEvent("Section", "section:" + section);
    this.navCtrl.push(Section, {section: section});
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
