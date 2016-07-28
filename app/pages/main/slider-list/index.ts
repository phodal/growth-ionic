import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {SlideBookDetailPage} from "../slider-detail/index";
import {getSpinnerConfig} from "../../../utils/helper";

@Component({
  templateUrl: "build/pages/main/slider-list/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class SlideBookTocPage {
  private chapters;
  private title;
  private action;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http, private params:NavParams) {
    this.http = http;
    this.title = this.params.get("title");
    this.action = this.params.get("action");
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL[this.action] + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.chapters = data["content"];
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(SlideBookDetailPage, {title: title, url: SERVER_BASE_URL[this.action] + url});
  }
}
