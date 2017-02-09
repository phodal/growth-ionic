import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import "rxjs/add/operator/map";
import {Http} from "@angular/http";
import {Helper} from "../../../utils/helper";

@Component({
  templateUrl: "chapter-detail.html",
  providers: [Helper]
})

export class ChapterDetailPage {
  private content;
  private url:string;
  private title:string;

  constructor(private loadingCtrl:LoadingController, public http:Http, public params:NavParams, public helper: Helper) {
    this.http = http;
    this.title = params.get("title");
    this.url = params.get("url");
  }

  ngOnInit() {
    let self = this;
    let loading = this.loadingCtrl.create(this.helper.getSpinnerConfig());
    loading.present();

    this.http.get(self.url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = this.helper.convertToMarkdown(data);
          loading.dismiss();
        },
        error => {
          loading.dismiss();
        }
      );
  }
}
