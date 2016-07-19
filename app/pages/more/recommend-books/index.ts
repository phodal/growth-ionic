import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";
import * as _ from "lodash";
import {ModalController} from "ionic-angular/index";
import {HtmlModal} from "../../../modals/HtmlModal/index";

@Component({
  templateUrl: "build/pages/more/recommend-books/index.html"
})
export class RecommendBook {
  private books;
  constructor(private modalCtrl:ModalController) {
    this.modalCtrl = modalCtrl;
    this.books = _.orderBy(BOOKS, ["category"], ["asc"]);
  }

  presentBookDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/review/" + slug + ".html", pageTitle: "书评"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
