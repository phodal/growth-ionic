import {NavController, AlertController, Platform} from 'ionic-angular';
import {Component} from '@angular/core';

import {Section} from "./section/section";
import {AnalyticsServices} from "../../services/analytics.services";
import {AppVersion} from '@ionic-native/app-version';
import {Http} from "@angular/http";
import {Helper} from "../../utils/helper";
import {PaperPage} from "./paper/paper";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AnalyticsServices, Helper]
})

export class HomePage {
  private shownGroup = false;
  private version: any;

  constructor(public navCtrl: NavController, public analytics: AnalyticsServices, public http: Http,
              public helper: Helper, private alertCtrl: AlertController, public platform: Platform, private appVersion: AppVersion) {
    this.analytics.trackView("Growth 2.0");
    if (this.platform.is('android')) {
      this.updateVersion();
    }
  }

  private updateVersion() {
    let self = this;
    this.http.get('http://growth.ren/version.json')
      .map(res => res.json())
      .subscribe(
        data => {
          this.appVersion.getVersionNumber().then(
            version => {
              self.version = version;
              if (self.version && self.helper.versionCompare(data.version, self.version, null) > 0) {
                self.presentConfirm(data['feature'], data.version)
              }
            }
          );
        }
      );
  }

  presentConfirm(feature, version) {
    let alert = this.alertCtrl.create({
      title: '发现新版本',
      message: feature,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '更新',
          handler: () => {
            this.analytics.trackEvent("update", version);
            this.helper.openLink('market://details?id=ren.growth');
          }
        }
      ]
    });
    alert.present();
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

  showGrowthPaper() {
    this.analytics.trackEvent("Section", "section: paper");
    this.navCtrl.push(PaperPage);
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
