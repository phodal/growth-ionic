import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Storage, LocalStorage} from "ionic-angular/index";
import {Component} from "@angular/core";

@Component({
  templateUrl: "build/modals/TodoModal/index.html"
})
export class TodoModal {
  private todoLists = [];
  private items;
  private doneItems = [];
  private localStorage;
  private domain;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.todoLists = params.get("todoLists").basic;
    this.domain = params.get("domain");
    this.localStorage = new Storage(LocalStorage);
    this.getDomainItemFromLocalStorage();
  }

  addItemToDone(item) {
    this.items = this.todoLists;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        item.checked = true;
        this.doneItems.push(item);
        this.items.splice(i, 1);
        this.addDomainItemInLocalStorage(this.items, this.doneItems);
      }
    }
  }

  getDomainItemFromLocalStorage() {
    let self = this;
    this.localStorage.get(this.domain).then(function (data) {
      if (data) {
        let dataWithParsed = JSON.parse(data);

        if (dataWithParsed.todoLists && dataWithParsed.doneItems) {
          self.todoLists = dataWithParsed.todoLists;
          self.doneItems = dataWithParsed.doneItems;
        }
      }
    });
  }

  addDomainItemInLocalStorage(items, doneItems) {
    this.localStorage.set(this.domain, JSON.stringify({todoLists: items, doneItems: doneItems}));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
