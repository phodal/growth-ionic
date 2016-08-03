import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {FORM_DIRECTIVES} from "@angular/forms";
import {RatingComponent} from "../../../components/ratings/index";
import {BookmarkServices} from "../../../services/bookmark.services";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {ModalController} from "ionic-angular/index";
import {forEach} from "lodash";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "build/pages/user-center/bookmarks/index.html",
  directives: [RatingComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [BookmarkServices, AnalyticsServices]
})
export class BookmarksPage {
  public bookmarks = [];

  constructor(private modalCtrl:ModalController, public bookmarkServices:BookmarkServices, private analytics:AnalyticsServices) {
    let self = this;
    this.bookmarkServices.getAllBookmarks()
      .then(result => {
          let data = JSON.parse((result));
          forEach(data, function (value, key) {
            self.bookmarks.push({
              slug: key,
              title: value
            });
          });
        }
      );
    this.analytics.trackView("User Center: Bookmark");
  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    modalParams = {slug: params.slug, pageTitle: "文章", articleTitle: params.title};

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
