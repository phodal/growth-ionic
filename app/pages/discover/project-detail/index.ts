import {Component} from "@angular/core";
import {NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  templateUrl: "build/pages/discover/project-detail/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ProjectDetailPage {
  private subdomain;

  constructor(public params:NavParams) {
    this.subdomain = params.get("subdomain");
  }

}
