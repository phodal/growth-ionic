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
  private isArticle;
  private pageTitle;
  private isAlreadyInBookmarksList = false;
  private slug;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              public bookmarkServices:BookmarkServices,
              http:Http) {

    this.pageTitle = params.get("pageTitle");
    this.isArticle = this.pageTitle === "文章";
    this.slug = params.get("slug");
    http.get(this.slug).subscribe(res => this.html = res.text());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  createBookmark() {
    this.isAlreadyInBookmarksList = true;
    this.bookmarkServices.add(this.slug);
  }
}
