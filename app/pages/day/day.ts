import {NavController, ModalController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "../../data/HELPER_ARTICLES";
import {TODO_LISTS} from "../../data/TODO_LISTS";
import {TodoModal} from "../../components/TodoModal";
import {HtmlModal} from "../../components/HtmlModal";
import {DAYS} from "../../data/DAYS";
import {BookListModal} from "../../components/BookListModal/index";

@Component({
  templateUrl: 'build/pages/day/day.html'
})
export class Day {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES['zh-cn'];
  private dayView = [];

  constructor(public nav:NavController, private modalCtrl:ModalController, public params:NavParams) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
    this.params = params;

    var day = params.get('day');
    this.dayView = DAYS["day" + day];
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
      slug = 'assets/desc/html/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: '简介'};
    } else {
      slug = 'assets/article/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: '文章'};
    }

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }

  presentGrowthModal(params) {
    var htmlModal, slug, modalParams;

    if(params.type === 'book') {
      htmlModal = this.modalCtrl.create(BookListModal, {domain: params.domain});
      htmlModal.present();
    } else if (params.type === 'tool') {
      slug = 'assets/tool/' + params.domain + '.html';
      modalParams = {slug: slug, pageTitle: '工具'};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
      htmlModal.present();
    } else if (params.domain) {
      slug = 'assets/growth/' + params.domain + '/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: 'Growth'};

      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
      htmlModal.present();
    }
  }
}
