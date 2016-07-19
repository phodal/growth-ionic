import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";

@Component({
  templateUrl: "build/modals/TodoModal/index.html"
})
export class TodoModal {
  private todoLists;
  private items;
  private doneItems = [];

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.todoLists = params.get("todoLists").basic;
  }

  removeItem(item) {
    this.items = this.todoLists;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.doneItems.push(item);
        this.items.splice(i, 1);
      }
    }
  }

  addItem(item) {
    this.items = this.todoLists;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.doneItems.push(item);
        this.items.splice(i, 1);
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
