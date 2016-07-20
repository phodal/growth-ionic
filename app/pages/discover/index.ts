import {Component} from "@angular/core";
import {CommunityPage} from "./community/index";
import {ExamPage} from "./exam/index";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/discover/index.html"
})
export class DiscoverPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openExamPage () {
    this.nav.push(ExamPage);
  }

  openCommunityPage () {
    this.nav.push(CommunityPage);
  }
}
