import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {Http} from "@angular/http";
import {ToolboxDetailPage} from "../toolbox-detail/toolbox-detail";
import {Helper} from "../../../utils/helper";

@Component({
  templateUrl: "toolbox-list.html",
  providers: [Helper]
})

export class ToolboxListPage {
  private toolboxs;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http, public helper: Helper) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(this.helper.getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.toolbox + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.toolboxs = data["content"];
          loading.dismiss();
        },
        error => {
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(ToolboxDetailPage, {title: title, url: SERVER_BASE_URL.toolbox + url});
  }
}
