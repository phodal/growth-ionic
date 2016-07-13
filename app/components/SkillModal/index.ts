import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/components/SkillModal/index.html'
})
export class SkillModal {
  private skills;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.skills = params.get('skills');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
