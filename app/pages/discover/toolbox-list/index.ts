import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  templateUrl: "build/pages/discover/toolbox-list/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ToolboxListPage {
  private toolboxs;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
    this.init();
  }

  private init() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: `<ion-spinner [name]="d.spinner"></ion-spinner>`,
      duration: 3000
    });
    loading.present();

    let url = 'http://toolbox.phodal.com/api/all.json';
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.toolboxs = data["content"];
          loading.dismiss();
        },
        err => {
          console.log(err);
        }
      );
  }
}
