import {NavController, ModalController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "../../data/HELPER_ARTICLES";
import {TODO_LISTS} from "../../data/TODO_LISTS";
import {TodoModal} from "../../modals/TodoModal";
import {HtmlModal} from "../../modals/HtmlModal";
import {DAYS} from "../../data/DAYS";
import {BookListModal} from "../../modals/BookListModal/index";
import {SkillModal} from "../../modals/SkillModal/index";

@Component({
  templateUrl: "build/pages/day/day.html"
})
export class Day {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES["zh-cn"];
  private dayView = [];
  private day;

  constructor(public nav:NavController, private modalCtrl:ModalController, public params:NavParams) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
    this.params = params;

    this.day = params.get("day");
    this.dayView = DAYS["day" + this.day];
  }

  presentTodoModal(params) {
    let todoLists = TODO_LISTS["zh-cn"][params.domain];
    let todoModal = this.modalCtrl.create(TodoModal, {todoLists: todoLists});
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
      slug = "assets/desc/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "简介"};
    } else if (params.type === "intro") {
      slug = "assets/days/intro-day" + this.day + ".html";
      modalParams = {slug: slug, pageTitle: "简介"};
    } else {
      slug = "assets/article/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "文章"};
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
      htmlModal = this.modalCtrl.create(BookListModal, {domain: params.domain});
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
