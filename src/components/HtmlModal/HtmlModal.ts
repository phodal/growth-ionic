import {Platform, NavParams, ViewController, Content} from "ionic-angular/index";
import {Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";

@Component({
  selector: 'growth-modal',
  templateUrl: "html-modal.html"
})

export class HtmlModal {
  @ViewChild(Content) content:Content;

  private html;
  private isArticle = false;
  private pageTitle;
  private slug;
  private articleTitle;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              http:Http) {

    this.slug = params.get("slug");
    this.pageTitle = params.get("pageTitle");
    if (this.pageTitle === "文章") {
      this.handleForArticleModal(params);
    }

    http.get(this.slug).subscribe(res => this.html = res.text());
  }

  handleForArticleModal(params:NavParams) {
    this.isArticle = true;
    this.articleTitle = params.get("articleTitle");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
