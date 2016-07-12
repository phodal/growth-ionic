import {NavController, ModalController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "../../data/HELPER_ARTICLES";
import {TODO_LISTS} from "../../data/TODO_LISTS";
import {TodoModal} from "../../components/TodoModal";
import {HtmlModal} from "../../components/HtmlModal";

@Component({
  templateUrl: 'build/pages/day/day1.html'
})
export class Day {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES['zh-cn'];
  private dayView = {
    intros: [
      {
        info: {slug: 'front', type: 'desc'}
      },
      {
        info: {slug: 'build', type: 'desc'}
      },
      {
        info: {slug: 'backend', type: 'desc'}
      }
    ],
    articlesView: [
      {
        title: '构建系统',
        articles: this.articles.build
      },
      {
        title: '前端',
        articles: this.articles.front
      },
      {
        title: '后台',
        articles: this.articles.backend
      },
    ],
    growthView: [
      {
        title: '前端',
        sections: [
          {
            title: 'Debug',
            info: {slug: 'debug', type: 'general', domain: 'frontend'}
          }
        ]
      },
      {
        title: '后台',
        sections: [
          {
            title: '服务框架',
            info: {slug: 'framework', type: 'general', domain: 'backend'}
          },
          {
            title: '应用框架',
            info: {slug: 'services', type: 'general', domain: 'backend'}
          }
        ]
      }
    ],
    todoView: [
      {
        title: '前端',
        info: {domain: 'frontend'}
      },
      {
        title: '后台',
        info: {domain: 'backend'}
      }
    ]
  };

  constructor(public nav:NavController, private modalCtrl:ModalController, public params:NavParams) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
    this.params = params;
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
    } else if (params.domain) {
      slug = 'assets/growth/' + params.domain + '/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: 'Growth'};
    } else {
      slug = 'assets/article/' + params.slug + '.html';
      modalParams = {slug: slug, pageTitle: '文章'};
    }

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
