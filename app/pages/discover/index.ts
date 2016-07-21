import {Component} from "@angular/core";
import {CommunityPage} from "./community/index";
import {ExamListPage} from "./exam-list/index";
import {NavController, Platform} from "ionic-angular/index";
import {RecommendBook} from "./recommend-books/index";
import {RecommendArticles} from "./recommend-articles/index";
import {TWBookPage} from "./thoughtworks-books/index";

@Component({
  templateUrl: "build/pages/discover/index.html"
})
export class DiscoverPage {
  private slideOptions = {
    initialSlide: 0,
    autoplay: 3000,
    loop: true
  };

  constructor(public nav:NavController, private platform:Platform) {
    this.nav = nav;
    this.platform = platform;
  }

  openExamPage() {
    this.nav.push(ExamListPage);
  }

  openCommunityPage() {
    this.nav.push(CommunityPage);
  }

  openRecommendBookPage() {
    this.nav.push(RecommendBook);
  }

  openRecommendArticlePage() {
    this.nav.push(RecommendArticles);
  }

  openThoughtWorksBookPage() {
    this.nav.push(TWBookPage);
  }

  launch(url) {
    this.platform.ready().then(() => {
      window.open(url, "_system", "location=true");
    });
  }
}
