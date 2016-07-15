import {NavParams, ViewController, Platform, Storage, LocalStorage} from "ionic-angular";
import {Component} from "@angular/core";
import {RatingComponent} from "../../components/ratings/index";

@Component({
  templateUrl: "build/modals/SkillModal/index.html",
  directives: [RatingComponent]
})
export class SkillModal {
  private skills;
  private localStorage;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController) {
    this.skills = params.get("skills");
    this.localStorage = new Storage(LocalStorage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setStar(skill, $event) {
    this.localStorage.set('skills', JSON.stringify({skill: skill.text, ratings: $event}))
  }
}
