import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";
import {BOOKS} from "../../data/BOOKS";

@Component({
  templateUrl: 'build/modals/BookListModal/index.html'
})
export class BookListModal {
  private books;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    var domain = params.get('domain');
    this.books = BOOKS.filter(function(el){
      return el.category === domain;
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
