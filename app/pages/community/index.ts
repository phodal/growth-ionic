import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular/index";
import {Http} from "@angular/http";
import {SERVER_BASE_URL} from "../../utils/constants";
import {TimeAgoPipe} from "angular2-moment";
import "moment/locale/zh-cn";
import {concat, filter} from "lodash";
import {CommunityDetailPage} from "./detail/index";
import {LoginPage} from "./profile/index";
import {UserData} from "../../providers/user-data";
import {CreateTopicPage} from "./create/index";

@Component({
  templateUrl: "build/pages/community/index.html",
  pipes: [TimeAgoPipe]

})
export class CommunityPage {
  private topics;
  private included;
  private nextPageUrl;
  private hasLogin = false;
  private loading = false;

  constructor(public nav:NavController, public http:Http, private events:Events, private userData:UserData) {
    this.http = http;
    this.events = events;
    this.eventHandle();
    this.init();
  }

  init() {
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
        }
      );
  }

  private getAuthorName(data, userId) {
    let username = "User";
    let userInfo = filter(data, userId);
    if (userInfo[0] && userInfo[0]["attributes"]) {
      username = userInfo[0]["attributes"]["username"];
    }
    return username;
  }

  private openDetailPage(topicId) {
    this.nav.push(CommunityDetailPage, {topicId: topicId});
  }

  private openLoginPage() {
    this.nav.push(LoginPage);
  }

  private openCreatePage() {
    this.nav.push(CreateTopicPage);
  }

  private eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      self.hasLogin = true;
    });
  }

  private doInfinite(infiniteScroll, url) {
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
        }
      );
  }
}
