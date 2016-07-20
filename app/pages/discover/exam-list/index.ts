import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {ExamDetailPage} from "../exam-detail/index";

@Component({
  templateUrl: "build/pages/discover/exam-list/index.html",
})
export class ExamListPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openExamDetailPage() {
    this.nav.push(ExamDetailPage);
  }
}
