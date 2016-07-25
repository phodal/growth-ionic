import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {getSpinnerConfig, convertToMarkdown} from "../../../utils/helper";

@Component({
  templateUrl: "build/pages/discover/roadmap-detail/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class RoadMapDetailPage {
  constructor() {

  }

}
