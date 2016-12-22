///<reference path="detail/community-detail.ts"/>
import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular";
import {Http} from "@angular/http";
import {SERVER_BASE_URL} from "../../utils/constants";
import "moment/locale/zh-cn";
import {concat, filter} from "lodash";
import {UserData} from "../../services/user-data";
import {AnalyticsServices} from "../../services/analytics.services";
import {UserProfilePage} from "./profile/user-profile";
import {CommunityDetailPage} from "./detail/community-detail";
import {CreateTopicPage} from "./create/create-topic";

@Component({
  templateUrl: "community.html",
  providers: [AnalyticsServices]
})
export class CommunityPage {
  private topics;
  private included;
  private nextPageUrl;
  private hasLogin = false;
  private loading = false;
  private isRefresh = false;
  private loadingError = false;

  constructor(public nav: NavController, public http: Http, private events: Events, private userData: UserData,
              private analytics: AnalyticsServices) {
    this.http = http;
    this.events = events;
    this.eventHandle();
    this.analytics.trackView("Community");
  }

  ngOnInit() {
    let url = SERVER_BASE_URL.forum;
    let self = this;
    self.loading = true;

    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = data.data;
          self.included = data.included;
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }

          self.loading = false;
        },
        error => {
          self.errorHandle();
        }
      );
  }

  errorHandle() {
    this.loading = false;
    this.isRefresh = false;

    this.loadingError = true;
  }

  doRefresh(refresher) {
    this.analytics.trackEvent("Community", "DoRefresh");
    let url = SERVER_BASE_URL.forum;
    let self = this;

    self.isRefresh = true;
    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          refresher.complete();
          self.topics = data.data;
          self.included = data.included;
          self.isRefresh = false;
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }
        },
        error => {
          self.errorHandle();
        }
      );
  }

  getAuthorName(data, userId) {
    let username = "User";
    let userInfo = filter(data, userId);
    if (userInfo[0] && userInfo[0]["attributes"]) {
      username = userInfo[0]["attributes"]["username"];
    }
    return username;
  }

  openDetailPage(topicId) {
    this.analytics.trackEvent("Community", "open topic");
    this.nav.push(CommunityDetailPage, {topicId: topicId});
  }

  openLoginPage() {
    this.analytics.trackEvent("Community", "Login");
    this.nav.push(UserProfilePage);
  }

  openCreatePage() {
    this.analytics.trackEvent("Community", "create topic");
    this.nav.push(CreateTopicPage);
  }

  eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      self.hasLogin = true;
    });

    this.events.subscribe("user:logout", () => {
      self.hasLogin = false;
    });
  }

  doInfinite(infiniteScroll, url) {
    this.analytics.trackEvent("Community", "Load More");
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = concat(self.topics, data.data);
          self.included = concat(self.included, data.included);
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }
          infiniteScroll.complete();
        },
        error => {
          self.errorHandle();
        }
      );
  }
}
