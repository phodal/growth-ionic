import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {ToolboxDetailPage} from "../toolbox-detail/index";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";
import {ArticleDetailPage} from "../article-detail/index";
import {RoadMapDetailPage} from "../roadmap-detail/index";

@Component({
  templateUrl: "build/pages/discover/roadmap-list/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class RoadMapPage {
  private roadmaps;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.roadmap + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.roadmaps = data["content"];
          loading.dismiss();
        }
      );
  }

  openRoadmapDetailPage(roadmap) {
    this.nav.push(RoadMapDetailPage, {roadmap: roadmap});
  }
}
