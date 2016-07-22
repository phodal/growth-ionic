import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";

@Component({
  templateUrl: "build/pages/discover/toolbox-list/index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ToolboxListPage {
  private toolboxs;

  constructor(public nav:NavController, public http:Http) {
    this.http = http;
    this.init();
  }

  private init() {
    let url = 'http://toolbox.phodal.com/api/all.json';
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.toolboxs = data["content"];
        },
        err => {
          console.log(err);
        }
      );
  }
}
