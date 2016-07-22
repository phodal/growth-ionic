import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';

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
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: `<ion-spinner [name]="d.spinner"></ion-spinner>`,
      duration: 3000
    });
    loading.present();

    let self = this;
    this.http.get(url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = data;
          console.log(data);
          loading.dismiss();
        },
        err => {
          console.log(err);
        }
      );
  }
}
