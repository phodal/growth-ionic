import {Component} from "@angular/core";
import {SOLUTIONS} from "../../data/SOLUTIONS";
import * as _ from "lodash";
import {HtmlModal} from "../../modals/HtmlModal/index";
import {ModalController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/solution/index.html",
})
export class SolutionPage {
  private solutions;

  constructor(private modalCtrl:ModalController) {
    this.solutions = _.orderBy(SOLUTIONS, ["type"], ["asc"]);
    this.modalCtrl = modalCtrl;
  }

  presentSolutionDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/solution/" + slug + ".html", pageTitle: "解决方案"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
