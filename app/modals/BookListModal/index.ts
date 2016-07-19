import {NavParams, ViewController, Platform, ModalController} from "ionic-angular/index";
import {Component} from "@angular/core";
import {BOOKS} from "../../data/BOOKS";
import {HtmlModal} from "../HtmlModal/index";

@Component({
  templateUrl: "build/modals/BookListModal/index.html"
})
export class BookListModal {
  private books;

  constructor(public platform:Platform,
              public params:NavParams,
              private modalCtrl:ModalController,
              public viewCtrl:ViewController) {
    let domain = params.get("domain");

    this.modalCtrl = modalCtrl;
    this.books = BOOKS.filter(function(el){
      return el.category === domain;
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentBookDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/review/" + slug + ".html", pageTitle: "书评"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
