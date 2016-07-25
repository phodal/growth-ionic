import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {ToolboxDetailPage} from "../toolbox-detail/index";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";
import {ProjectDetailPage} from "../project-detail/index";

@Component({
  templateUrl: "build/pages/discover/project-list/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ProjectListPage {
  private domainProjects;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
    this.init();
  }

  init() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.project + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.domainProjects = data["content"];
          loading.dismiss();
        }
      );
  }

  openProjectDetailPage(subdomain) {
    this.nav.push(ProjectDetailPage, {subdomain: subdomain});
  }
}
