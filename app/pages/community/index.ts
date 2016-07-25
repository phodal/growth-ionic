import {Component} from "@angular/core";
import {LoadingController, NavController} from "ionic-angular/index";
import {Http} from "@angular/http";
import {getSpinnerConfig} from "../../utils/helper";
import {SERVER_BASE_URL} from "../../utils/constants";
import {TimeAgoPipe} from "angular2-moment";
import "moment/locale/zh-cn";
import {mergeWith} from "lodash";

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
          if (data.links && data.links.next) {
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }

          loading.dismiss();
        }
      );
  }

  doInfinite(infiniteScroll, url) {
    console.log('Begin async operation');
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          self.topics = mergeWith(self.topics, data.data);
          self.included = mergeWith(self.topics, data.included);
          if (data.links && data.links.next) {
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }
          infiniteScroll.complete();
        }
      );
  }
}
