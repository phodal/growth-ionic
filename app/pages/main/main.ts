import {NavController, TranslatePipe, Page, Modal, Platform, ViewController, NavParams} from "ionic-angular";
import {HELPER_ARTICLES} from "./HELPER_ARTICLES"
import {Http, Response} from "angular2/http";

@Page({
  templateUrl: 'build/articles/article.html'
})
class Article {
  private html;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              http: Http) {
    http.get(params.get('slug')).subscribe(res => this.html = res.text());
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
  articles = HELPER_ARTICLES['zh-cn'];

  constructor(public nav:NavController) {
    this.nav = nav;
  }

  presentArticleModal(params) {
    var articleSlug = 'assets/articles/' + params.slug + '.html';
    var descSlug = 'assets/desc/html/' + params.slug + '.html';

    if(params.type === 'desc') {
      let articleModal = Modal.create(Article, {slug: descSlug});
    } else {
      let articleModal = Modal.create(Article, {slug: articleSlug});
    }

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
