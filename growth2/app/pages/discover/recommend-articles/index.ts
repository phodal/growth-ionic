import {Component} from "@angular/core";
import * as _ from "lodash";
import {HELPER_ARTICLES} from "../../../data/HELPER_ARTICLES";
import {DOMAIN} from "../../../data/DOMAIN_NAME";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {ModalController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/discover/recommend-articles/index.html"
})
export class RecommendArticles {
  private helpArticles;

  constructor(private modalCtrl:ModalController) {
    this.modalCtrl = modalCtrl;
    this.init();
  }

  init() {
    this.helpArticles = _.transform(HELPER_ARTICLES["zh-cn"], function (result, value, key) {
      result.push({domain: key, value: value});
      return true;
    }, []);
  }

  getDomainName(domain) {
    return DOMAIN[domain];
  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    let slug = "assets/article/" + params.slug + ".html";
    modalParams = {slug: slug, pageTitle: "文章", articleTitle: params.title};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }

}
