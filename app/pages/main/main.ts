import {NavController, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "./HELPER_ARTICLES";
import {TODO_LISTS} from "./TODO_LISTS";
import {Todo} from "../components/todo";
import {HTMLModal} from "../components/html-modal";


@Component({
  templateUrl: 'build/pages/day/day1.html'
})
export class Day1 {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES['zh-cn'];

  constructor(public nav:NavController, private modalCtrl:ModalController) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
  }

  ionViewLoaded() {
    console.log("I'm alive!");
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  presentTodoModal(params) {
    var todoLists = TODO_LISTS['zh-cn'][params.domain];
    var todoModal = this.modalCtrl.create(Todo, {todoLists: todoLists});
    todoModal.present();
  }

  presentHTMLModal(params) {
    var articleModal;

    if (params.type === 'desc') {
      var slug = 'assets/desc/html/' + params.slug + '.html';
      articleModal = this.modalCtrl.create(HTMLModal, {slug: slug});
    } else if (params.domain) {
      var slug = 'assets/growth/' + params.domain + '/' + params.slug + '.html';
      articleModal = this.modalCtrl.create(HTMLModal, {slug: slug});
    } else {
      var slug = 'assets/articles/' + params.slug + '.html';
      articleModal = this.modalCtrl.create(HTMLModal, {slug: slug});
    }

    articleModal.present();
  }
}

@Component({
  templateUrl: 'build/pages/main/main.html'
})
export class MainView {
  constructor(public nav:NavController) {

  }

  setPages() {
    this.nav.setPages([{page: Day1}], {
      animate: true
    });
  }

  openNavDetailsPage() {
    this.nav.push(Day1);
  }
}
