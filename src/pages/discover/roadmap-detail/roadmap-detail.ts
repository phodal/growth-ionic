import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import "rxjs/add/operator/map";

@Component({
  templateUrl: "roadmap-detail.html"
})

export class RoadMapDetailPage {
  private roadmap;

  constructor(public params:NavParams) {
    this.roadmap = params.get("roadmap");
  }

}
