import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {RecommendBook} from "./recommend-books/index";
import {RecommendArticles} from "./recommend-articles/index";

@Component({
  templateUrl: "build/pages/more/index.html"
})
export class MorePage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openRecommendBookPage() {
    this.nav.push(RecommendBook);
  }
  openRecommendArticlePage() {
    this.nav.push(RecommendArticles);
  }
}
