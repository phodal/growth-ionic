import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";
import {AnalyticsServices} from "../../services/analytics.services";
import {Helper} from "../../utils/helper";
import {SkillListPage} from "./skill-list/skill-list";
import {BookmarksPage} from "./bookmarks/bookmarks";
import {AboutUsPage} from "./about-us/about-us";
import {SkillMapService} from "../../services/skill.map.services";
import {BookmarkServices} from "../../services/bookmark.services";
import {DonatePage} from "./donate/donate";
import {AppRate} from "@ionic-native/app-rate";

@Component({
  selector: "user-center",
  templateUrl: "user-center.html",
  providers: [AnalyticsServices, SkillMapService, BookmarkServices, Helper]
})
export class UserCenterPage {
  public skillCount;
  public bookmarkCount;

  constructor(public nav: NavController, private analytics: AnalyticsServices, public helper: Helper,
              private socialSharing: SocialSharing, private appRate: AppRate,
              public skillMapService:SkillMapService, public bookmarkServices:BookmarkServices, public platform: Platform) {
    this.nav = nav;
    this.init();
    this.analytics.trackView("User Center");
  }

  ionViewWillEnter(){
    let self = this;
    this.skillMapService.getSkillTotalAmount(function(data){
      self.skillCount = data;
    });
    this.bookmarkServices.getBookmarkCount(function(data){
      self.bookmarkCount = data;
    });
  }

  openAllSkillListPage() {
    this.analytics.trackEvent("User Center", "skill list");
    this.nav.push(SkillListPage);
  }

  openAboutUsPage() {
    this.analytics.trackEvent("User Center", "about us");
    this.nav.push(AboutUsPage);
  }

  openBookmarksPage() {
    this.analytics.trackEvent("User Center", "bookmarks");
    this.nav.push(BookmarksPage);
  }

  openDonatePage() {
    this.analytics.trackEvent("User Center", "donate");
    this.nav.push(DonatePage);
  }

  init() {
    if(!this.appRate.preferences) {
      return ;
    }
    this.appRate.preferences.useLanguage = "zh-Hans";
    this.appRate.preferences.storeAppURL = {
      ios: "1078807522",
      android: "market://details?id=ren.growth",
      windows8: "ms-windows-store:Review?name=51077Phodal.GrowthRen_d4jwzt1r37cxj"
    };
    this.appRate.preferences.customLocale = {
      title: "动动手指，为我们打分",
      message: "无论是来自亲的赞美诗，还是让亲唾沫横飞的槽点，我们只愿——让评价来得更猛烈些吧！",
      cancelButtonLabel: "残忍地拒绝",
      laterButtonLabel: "容我考虑考虑",
      rateButtonLabel: "马上就去"
    };
  }

  openUrl(url) {
    this.helper.openLink(url);
  }

  RateApp() {
    this.appRate.promptForRating(true);
  }

  shareIt() {
    this.socialSharing.share("我现在使用Growth，这是一款专注于Web开发者成长的应用，涵盖Web开发的流程及技术栈，Web开发的学习路线、成长衡量等各方面。快来下载吧!", "", "", "http://growth.ren/");
  }
}
