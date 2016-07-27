import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {SkillListPage} from "./skill-list/index";
import {AboutUsPage} from "./about-us/index";
import {AppRate} from "ionic-native";
import {LicensePage} from "./license/index";
import {SocialSharing} from 'ionic-native';

@Component({
  templateUrl: "build/pages/user-center/index.html"
})
export class UserCenterPage {
  constructor(public nav:NavController) {
    this.nav = nav;
    this.init();
  }

  openAllSkillListPage() {
    this.nav.push(SkillListPage);
  }

  openAboutUsPage() {
    this.nav.push(AboutUsPage);
  }

  openLicensePage() {
    this.nav.push(LicensePage);
  }

  init() {
    if (window.cordova) {
      AppRate.preferences.useLanguage = "zh-Hans";
      AppRate.preferences.storeAppURL.ios = "1078807522";
      AppRate.preferences.storeAppURL.android = "market://details?id=ren.growth";
      AppRate.preferences.storeAppURL.windows8 = "ms-windows-store:Review?name=51077Phodal.GrowthRen_d4jwzt1r37cxj";
      AppRate.preferences.customLocale = {
        title: "动动手指，为我们打分",
        message: "无论是来自亲的赞美诗，还是让亲唾沫横飞的槽点，我们只愿——让评价来得更猛烈些吧！",
        cancelButtonLabel: "残忍地拒绝",
        laterButtonLabel: "容我考虑考虑",
        rateButtonLabel: "马上就去"
      };
    }
  }

  RateApp() {
    AppRate.promptForRating(true);
  }

  shareIt() {
    SocialSharing.share('我现在使用Growth，这是一款专注于Web开发者成长的应用，涵盖Web开发的流程及技术栈，Web开发的学习路线、成长衡量等各方面。快来下载吧!', '', '', 'http://growth.ren/');
  }
}
