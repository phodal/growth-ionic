import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'growth-modal',
  templateUrl: "todo-modal.html"
})
export class TodoModal {
  private todoLists = [];
  private items;
  private doneItems = [];
  private domain;

  constructor(public platform:Platform,
              public params:NavParams,
              public storage: Storage,
              public viewCtrl:ViewController) {
    this.todoLists = params.get("todoLists").basic;
    this.domain = params.get("domain");
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
    this.storage.get(this.domain).then(function (data) {
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
    this.storage.set(this.domain, JSON.stringify({todoLists: items, doneItems: doneItems}));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
