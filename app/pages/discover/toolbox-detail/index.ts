import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {getSpinnerConfig, convertToMarkdown} from "../../../utils/helper";

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
