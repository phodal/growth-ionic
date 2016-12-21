import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import "rxjs/add/operator/map";
import {getSpinnerConfig, convertToMarkdown} from "../../../utils/helper";
import {Http} from "@angular/http";

@Component({
  templateUrl: "toolbox-detail.html"
})

export class ToolboxDetailPage {
  private content;
  private url:string;
  private title:string;

  constructor(private loadingCtrl:LoadingController, public http:Http, public params:NavParams) {
    this.http = http;
    this.title = params.get("title");
    this.url = params.get("url");
  }

  ngOnInit() {
    let url = this.url;
    let self = this;
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    this.http.get(url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = convertToMarkdown(data);
          loading.dismiss();
        }
      );
  }
}
