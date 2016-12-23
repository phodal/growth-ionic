import {Platform, ViewController, Content, NavParams} from "ionic-angular";
import {Component, ViewChild} from "@angular/core";

@Component({
  selector: 'skill-tree-modal',
  templateUrl: "skill-tree-modal.html"
})

export class SkillTreeModal {
  @ViewChild(Content) content: Content;
  public skill;

  constructor(public platform: Platform,
              public params:NavParams,
              public viewCtrl: ViewController) {
    this.skill = params.get("skill");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addItemToDone(item) {

  }
}
