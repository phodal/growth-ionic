import {NavController, NavParams, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {SECTIONS} from "../../../data/SECTIONS";
import {HtmlModal} from "../../../components/HtmlModal/HtmlModal";
import {BookListModal} from "../../../components/BookListModal/BookListModal";
import {TodoModal} from "../../../components/TodoModal/TodoModal";
import {TODO_LISTS} from "../../../data/TODO_LISTS";
import {SkillModal} from "../../../components/SkillModal/SkillModal";

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
    let todoLists = TODO_LISTS["zh-cn"][params.domain];
    let todoModal = this.modalCtrl.create(TodoModal, {todoLists: todoLists, domain: params.domain});
    todoModal.present();
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
    let skillModal = this.modalCtrl.create(SkillModal, {domain: domain});
    skillModal.present();
  }

  presentGrowthModal(params) {
    let htmlModal, slug, modalParams;

    if (params.type === "book") {
      modalParams = {domain: params.domain};
      htmlModal = this.modalCtrl.create(BookListModal, modalParams);
    } else if (params.type === "tool") {
      slug = "assets/tool/" + params.domain + ".html";
      modalParams = {slug: slug, pageTitle: "工具"};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    } else if (params.domain) {
      slug = "assets/growth/" + params.domain + "/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "Growth"};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    }

    htmlModal.present();
  }
}
