import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ExamDetailPage} from "../exam-detail/exam-detail";

@Component({
  templateUrl: "exam-list.html",
})
export class ExamListPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openExamDetailPage(domain) {
    this.nav.push(ExamDetailPage, {domain: domain});
  }
}
