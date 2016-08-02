import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";
import * as _ from "lodash";
import {ModalController} from "ionic-angular/index";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {DOMAIN} from "../../../data/DOMAIN_NAME";
import {TODO_LISTS} from "../../../data/TODO_LISTS";
import {TodoModal} from "../../../modals/TodoModal/index";

@Component({
  templateUrl: "build/pages/discover/todo-lists/index.html"
})
export class TodoListsPage {
  private todoLists;
  constructor(private modalCtrl:ModalController) {
    this.modalCtrl = modalCtrl;
    this.init();
  }

  init() {
    this.todoLists = _.transform(TODO_LISTS["zh-cn"], function (result, value, key) {
      result.push({domain: key, value: value});
      return true;
    }, []);
  }

  presentTodoModal(params) {
    let todoLists = TODO_LISTS["zh-cn"][params.domain];
    let todoModal = this.modalCtrl.create(TodoModal, {todoLists: todoLists, domain: params.domain});
    todoModal.present();
  }
}
