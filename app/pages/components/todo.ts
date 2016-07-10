import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/articles/todo.html'
})
export class Todo {
  private todoLists;
  private items;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.todoLists = params.get('todoLists').basic;
  }

  removeItem(item) {
    this.items = this.todoLists;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
