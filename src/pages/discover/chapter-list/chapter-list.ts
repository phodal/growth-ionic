import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {Http} from "@angular/http";
import {getSpinnerConfig} from "../../../utils/helper";
import {ChapterDetailPage} from "../chapter-detail/chapter-detail";

@Component({
  templateUrl: "chapter-list.html"
})

export class ChapterListPage {
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
    this.nav.push(ChapterDetailPage, {title: title, url: SERVER_BASE_URL[this.action] + url});
  }
}
