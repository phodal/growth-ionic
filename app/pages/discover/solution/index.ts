import {Component} from "@angular/core";
import * as _ from "lodash";
import {ModalController} from "ionic-angular/index";
import {SOLUTIONS} from "../../../data/SOLUTIONS";
import {HtmlModal} from "../../../modals/HtmlModal/index";

@Component({
  templateUrl: "build/pages/discover/solution/index.html",
})
export class SolutionPage {
  private solutions;

  constructor(private modalCtrl:ModalController) {
    this.solutions = _.orderBy(SOLUTIONS, ["slug"], ["asc"]);
    this.modalCtrl = modalCtrl;
  }

  presentSolutionDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/solution/" + slug + ".html", pageTitle: "解决方案"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
