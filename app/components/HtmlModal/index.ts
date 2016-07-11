import {Platform, NavParams, ViewController} from "ionic-angular/index";
import {Component} from "@angular/core";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'build/components/HtmlModal/index.html'
})
export class HtmlModal {
  private html;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              http:Http) {
    http.get(params.get('slug')).subscribe(res => this.html = res.text());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
