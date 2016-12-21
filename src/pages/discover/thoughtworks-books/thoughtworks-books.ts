import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DomainDetailPage} from "./domain-detail-page/domain-detail-page";

@Component({
  templateUrl: "thoughtworks-books.html"
})
export class TWBookPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openDomainDetailPage(domain) {
    this.nav.push(DomainDetailPage, {domain: domain});
  }

}
