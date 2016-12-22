import {Component} from "@angular/core";
import {BookmarkServices} from "../../../services/bookmark.services";
import {ModalController} from "ionic-angular";
import {forEach} from "lodash";
import {AnalyticsServices} from "../../../services/analytics.services";
import {HtmlModal} from "../../../components/HtmlModal/HtmlModal";

@Component({
  templateUrl: "bookmarks.html",
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
