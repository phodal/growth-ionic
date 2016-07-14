import {NavController, ModalController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "../../data/HELPER_ARTICLES";
import {TODO_LISTS} from "../../data/TODO_LISTS";
import {TodoModal} from "../../modals/TodoModal";
import {HtmlModal} from "../../modals/HtmlModal";
import {DAYS} from "../../data/DAYS";
import {BookListModal} from "../../modals/BookListModal/index";
import {SkillModal} from "../../modals/SkillModal/index";
import {ALL_SKILLS} from "../../data/ALL_SKILLS";

@Component({
  templateUrl: 'build/pages/day/day.html'
})
export class Day {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES['zh-cn'];
  private dayView = [];
  private day;

  constructor(public nav:NavController, private modalCtrl:ModalController, public params:NavParams) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
    this.params = params;

    this.day = params.get('day');
    this.dayView = DAYS["day" + this.day];
  }

  ionViewLoaded() {

  }

  ionViewWillLeave() {

  }

  presentTodoModal(params) {
    var todoLists = TODO_LISTS['zh-cn'][params.domain];
    var todoModal = this.modalCtrl.create(TodoModal, {todoLists: todoLists});
    todoModal.present();
  }

  presentHtmlModal(params) {
    var htmlModal, slug, modalParams;

    if (params.type === 'desc') {
      slug = 'content/html/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: '简介'};
    } else if (params.type === 'intro') {
      slug = 'content/days/intro-day' + this.day + '.html';
      modalParams = {slug: slug, pageTitle: '简介'};
    } else {
      slug = 'content/article/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: '文章'};
    }

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }

  presentSkillModal(domain) {
    var skills = ALL_SKILLS[domain];
    var skillModal = this.modalCtrl.create(SkillModal, {skills: skills});
    skillModal.present();
  }

  presentGrowthModal(params) {
    var htmlModal, slug, modalParams;

    if (params.type === 'book') {
      htmlModal = this.modalCtrl.create(BookListModal, {domain: params.domain});
      htmlModal.present();
    } else if (params.type === 'tool') {
      slug = 'content/tool/' + params.domain + '.html';
      modalParams = {slug: slug, pageTitle: '工具'};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
      htmlModal.present();
    } else if (params.domain) {
      slug = 'content/growth/' + params.domain + '/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: 'Growth'};

      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
      htmlModal.present();
    }
  }
}
