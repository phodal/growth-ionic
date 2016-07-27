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
  private isWantSearch = false;

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

  toggleSearchBar() {
    if (this.isWantSearch) {
      this.isWantSearch = false;
    } else {
      this.isWantSearch = true;
    }
  }

  getItems(ev) {
    this.solutions = _.orderBy(SOLUTIONS, ["slug"], ["asc"]);
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.solutions = this.solutions.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.description.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      })
    }
  }
}
