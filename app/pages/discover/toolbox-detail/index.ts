import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import * as showdown from "showdown";

@Component({
  templateUrl: "build/pages/discover/toolbox-detail/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ToolboxDetailPage {
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
    let loading = this.loadingCtrl.create({
      spinner: "circles",
      content: `<ion-spinner [name]="d.spinner"></ion-spinner>`,
      duration: 3000
    });
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
