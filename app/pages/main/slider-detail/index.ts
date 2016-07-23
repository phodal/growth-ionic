import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import * as showdown from "showdown";
import {SPINNER_CONFIG} from "../../../utils/constants";

@Component({
  templateUrl: "build/pages/main/slider-detail/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class SlideBookDetailPage {
  private content;
  private url:string;
  private title:string;

  constructor(private loadingCtrl:LoadingController, public http:Http, public params:NavParams) {
    this.http = http;
    this.title = params.get("title");
    this.url = params.get("url");
    this.init(this.url);
  }

  private init(url:string) {
    let self = this;
    let converter = new showdown.Converter();
    let loading = this.loadingCtrl.create(SPINNER_CONFIG);
    loading.present();

    this.http.get(url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = converter.makeHtml(data);
          loading.dismiss();
        }
      );
  }
}
