import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {FORM_DIRECTIVES} from "@angular/forms";
import {RatingComponent} from "../../../components/ratings/index";
import {BookmarkServices} from "../../../services/bookmark.services";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {ModalController} from "ionic-angular/index";
import {forEach} from "lodash";

@Component({
  templateUrl: "build/pages/user-center/bookmarks/index.html",
  directives: [RatingComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [BookmarkServices]
})
export class BookmarksPage {
  public bookmarks = [];

  constructor(private modalCtrl:ModalController, public bookmarkServices:BookmarkServices) {
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
  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    modalParams = {slug: params.slug, pageTitle: "文章", articleTitle: params.title};

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
