import {Platform, NavParams, ViewController, Content} from "ionic-angular/index";
import {Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'build/components/HtmlModal/index.html'
})
export class HtmlModal {
  @ViewChild(Content) content: Content;

  private html;
  private pageTitle;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              http:Http) {

    this.pageTitle = params.get('pageTitle');
    http.get(params.get('slug')).subscribe(res => this.html = res.text());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
