import {NavController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";

import {SECTIONS} from "../../../data/SECTIONS";

@Component({
  selector: 'section-page',
  templateUrl: 'section.html'
})

export class Section {
  basicView:string = "articleView";
  private sectionInfo;
  private section;

  constructor(public navCtrl: NavController, public params:NavParams) {
    this.params = params;

    this.section = params.get("section");
    this.sectionInfo = SECTIONS[this.section];
  }

  presentTodoModal(params) {

  }

  presentHtmlModal(params) {

  }

  generateHtmlModalParams(params) {

  }

  presentSkillModal(domain) {

  }

  presentGrowthModal(params) {

  }
}
