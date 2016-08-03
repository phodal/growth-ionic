import {Platform, NavParams, ViewController, Content} from "ionic-angular/index";
import {Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {BookmarkServices} from "../../services/bookmark.services";

@Component({
  templateUrl: "build/modals/HtmlModal/index.html",
  providers: [BookmarkServices]
})
export class HtmlModal {
  @ViewChild(Content) content:Content;

  private html;
  private isArticle = false;
  private pageTitle;
  private isAlreadyInBookmarksList = false;
  private slug;
  private articleTitle;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              public bookmarkServices:BookmarkServices,
              http:Http) {

    this.slug = params.get("slug");
    this.pageTitle = params.get("pageTitle");
    if (this.pageTitle === "文章") {
      this.handleForArticleModal(params);
    }

    http.get(this.slug).subscribe(res => this.html = res.text());
  }

  private handleForArticleModal(params:NavParams) {
    let self = this;
    this.isArticle = true;
    this.articleTitle = params.get("articleTitle");
    this.bookmarkServices.getArticleBookmarkStatus(this.slug, function (isAlreadySaveBookmark) {
      self.isAlreadyInBookmarksList = isAlreadySaveBookmark;
    });
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }

  private toggleBookmark() {
    if (this.isAlreadyInBookmarksList) {
      this.isAlreadyInBookmarksList = false;
    } else {
      this.isAlreadyInBookmarksList = true;
    }
    this.bookmarkServices.toggleArticleBookmark(this.slug, this.articleTitle);
  }
}
