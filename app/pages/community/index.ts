import {Component} from "@angular/core";
import {LoadingController, NavController} from "ionic-angular/index";
import {Http} from "@angular/http";
import {getSpinnerConfig} from "../../utils/helper";
import {SERVER_BASE_URL} from "../../utils/constants";
import {TimeAgoPipe} from "angular2-moment";
import "moment/locale/zh-cn";
import {concat, filter} from "lodash";
import {CommunityDetailPage} from "./detail/index";

@Component({
  templateUrl: "build/pages/community/index.html",
  pipes: [TimeAgoPipe]

})
export class CommunityPage {
  private topics;
  private included;
  private nextPageUrl;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
    this.init();
  }

  init() {
    let url = SERVER_BASE_URL.forum;
    let self = this;
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

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

          loading.dismiss();
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
    this.nav.push(CommunityDetailPage, {topicId: topicId});
  }

  doInfinite(infiniteScroll, url) {
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = concat(self.topics, data.data);
          self.included = concat(self.topics, data.included);
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
