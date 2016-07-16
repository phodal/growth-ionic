import {NavParams, ViewController, Platform, Storage, LocalStorage} from "ionic-angular";
import {Component} from "@angular/core";
import {RatingComponent} from "../../components/ratings/index";
import {SkillMapService} from "../../services/skill.map.services";

@Component({
  templateUrl: "build/modals/SkillModal/index.html",
  directives: [RatingComponent],
  providers: [SkillMapService]
})
export class SkillModal {
  private skills;
  private localStorage;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              public skillMapService:SkillMapService) {

    this.skills = params.get("skills");
    this.localStorage = new Storage(LocalStorage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setStar(skill, $event) {
    let data = {skill: skill.text, ratings: $event};
    this.skillMapService.addSkill(data);
  }
}
