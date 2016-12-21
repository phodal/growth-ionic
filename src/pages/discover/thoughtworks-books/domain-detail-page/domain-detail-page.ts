import {Component} from "@angular/core";
import {TWBOOKS} from "../../../../data/TWBOOKS";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: "domain-detail-page.html"
})
export class DomainDetailPage {
  private books;
  private domain;
  constructor(public params:NavParams) {
    this.domain = params.get("domain");
    this.books = TWBOOKS["zh-cn"][this.domain]["books"];
  }
}
