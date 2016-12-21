import {NavController, NavParams, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {SECTIONS} from "../../../data/SECTIONS";
import {HtmlModal} from "../../../components/HtmlModal/HtmlModal";

@Component({
  selector: 'section-page',
  templateUrl: 'section.html'
})

export class Section {
  basicView:string = "articleView";
  private sectionInfo;
  private section;

  constructor(public navCtrl: NavController, public params:NavParams, private modalCtrl:ModalController) {
    this.params = params;

    this.section = params.get("section");
    this.sectionInfo = SECTIONS[this.section];
  }

  presentTodoModal(params) {

  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    modalParams = this.generateHtmlModalParams(params);

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }

  generateHtmlModalParams(params) {
    let slug, modalParams;

    if (params.type === "desc") {
      slug = "assets/content/desc/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "简介"};
    } else {
      slug = "assets/content/article/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "文章", articleTitle: params.title};
    }

    return modalParams;
  }

  presentSkillModal(domain) {

  }

  presentGrowthModal(params) {

  }
}
