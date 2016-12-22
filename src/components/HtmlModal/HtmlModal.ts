import {Platform, NavParams, ViewController, Content} from "ionic-angular/index";
import {Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {BookmarkServices} from "../../services/bookmark.services";

@Component({
  selector: 'growth-modal',
  templateUrl: "html-modal.html",
  providers: [BookmarkServices]
})

export class HtmlModal {
  @ViewChild(Content) content: Content;

  private html;
  private isArticle = false;
  private pageTitle;
  private slug;
  private articleTitle;
  private isAlreadyInBookmarksList = false;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public bookmarkServices: BookmarkServices,
              public http: Http) {

    this.slug = params.get("slug");
    this.pageTitle = params.get("pageTitle");
    if (this.pageTitle === "文章") {
      this.handleForArticleModal(params);
    }

    http.get(this.slug).subscribe(res => this.html = res.text());
  }

  handleForArticleModal(params: NavParams) {
    let self = this;
    this.isArticle = true;
    this.articleTitle = params.get("articleTitle");
    this.bookmarkServices.getArticleBookmarkStatus(this.slug, function (isAlreadySaveBookmark) {
      self.isAlreadyInBookmarksList = isAlreadySaveBookmark;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toggleBookmark() {
    this.isAlreadyInBookmarksList = !this.isAlreadyInBookmarksList;
    this.bookmarkServices.toggleArticleBookmark(this.slug, this.articleTitle);
  }
}
