import {Component} from "@angular/core";
import {TWBOOKS} from "../../../../data/TWBOOKS";
import {NavParams} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/discover/thoughtworks-books/domain-detail-page/index.html"
})
export class DomainDetailPage {
  private books;
  private domain;
  constructor(public params:NavParams) {
    this.domain = params.get("domain");
    this.books = TWBOOKS['zh-cn'][this.domain]['books'];
  }
}
