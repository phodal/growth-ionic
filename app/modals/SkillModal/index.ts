import {NavParams, ViewController, Platform} from "ionic-angular/index";
import {Component} from "@angular/core";
import {RatingComponent} from "../../components/ratings/index";

@Component({
  templateUrl: "build/modals/SkillModal/index.html",
  directives: [RatingComponent]
})
export class SkillModal {
  private skills;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.skills = params.get("skills");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
