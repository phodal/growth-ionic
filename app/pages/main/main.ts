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
    console.log(params.get('slug').slug);
    var slug = params.get('slug').slug;
    http.get('assets/articles/' + slug + '.html').subscribe(res => this.html = res._body);
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
