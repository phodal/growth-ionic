import {NavParams, ViewController, Platform, Page} from "ionic-angular/index";

@Page({
  templateUrl: 'build/articles/todo.html'
})
export class Todo {
  private todoLists;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.todoLists = params.get('todoLists').basic;
  }

  removeItem(item) {

  }

  addToTask(item) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
