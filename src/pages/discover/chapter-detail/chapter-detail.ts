import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import "rxjs/add/operator/map";
import {Http} from "@angular/http";
import {getSpinnerConfig, convertToMarkdown} from "../../../utils/helper";

@Component({
  templateUrl: "chapter-detail.html"
})

export class ChapterDetailPage {
  private content;
  private url:string;
  private title:string;

  constructor(private loadingCtrl:LoadingController, public http:Http, public params:NavParams) {
    this.http = http;
    this.title = params.get("title");
    this.url = params.get("url");
  }

  ngOnInit() {
    let self = this;
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    this.http.get(self.url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = convertToMarkdown(data);
          loading.dismiss();
        }
      );
  }
}
