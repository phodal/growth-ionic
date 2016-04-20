import {NavController, TranslatePipe, Page, Modal, Platform, ViewController, NavParams} from "ionic-angular";
import {HELPER_ARTICLES} from "./HELPER_ARTICLES"

@Page({
  templateUrl: 'build/articles/article.html'
})
class Article {
  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Page({
  templateUrl: 'build/pages/day/day1.html'
})
export class Day1 {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES['zh-cn']['front'];

  constructor(public nav:NavController) {
    this.nav = nav;
  }

  presentArticleModal(slug) {
    let articleModal = Modal.create(Article, {slug: slug});
    this.nav.present(articleModal);
  }
}

@Page({
  templateUrl: 'build/pages/main/main.html',
  pipes: [TranslatePipe]
})
export class MainView {
  constructor(public nav:NavController) {

  }

  openNavDetailsPage() {
    this.nav.push(Day1);
  }
}
