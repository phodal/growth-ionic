import {NavParams, ViewController, Platform, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {BOOKS} from "../../data/BOOKS";
import {HtmlModal} from "../HtmlModal/HtmlModal";

@Component({
  templateUrl: "book-list-modal.html"
})
export class BookListModal {
  private books;

  constructor(public platform:Platform,
              public params:NavParams,
              private modalCtrl:ModalController,
              public viewCtrl:ViewController) {
    let domain = params.get("domain");

    this.modalCtrl = modalCtrl;
    this.books = BOOKS["zh-cn"][domain];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentBookDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/content/review/" + slug + ".html", pageTitle: "书评"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
