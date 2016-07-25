import {Component} from "@angular/core";
import {LoadingController, NavController} from "ionic-angular/index";
import {Http} from "@angular/http";
import {getSpinnerConfig} from "../../utils/helper";
import {SERVER_BASE_URL} from "../../utils/constants";
import {TimeAgoPipe} from "angular2-moment";
import "moment/locale/zh-cn";

@Component({
  templateUrl: "build/pages/community/index.html",
  pipes: [TimeAgoPipe]

})
export class CommunityPage {
  private topics;
  private included;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
    this.init();
  }

  init() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.forum;
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = data.data;
          self.included = data.included;
          loading.dismiss();
        }
      );
  }
}
