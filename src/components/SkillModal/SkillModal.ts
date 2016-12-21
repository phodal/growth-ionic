import {NavParams, ViewController, Platform } from "ionic-angular";
import {Component} from "@angular/core";
import {RatingComponent} from "../../components/ratings/index";
import {SkillMapService} from "../../services/skill.map.services";

@Component({
  selector: 'skill-modal',
  templateUrl: "skill-modal.html",
  providers: [SkillMapService]
})
export class SkillModal {
  private skills;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              public skillMapService:SkillMapService) {

    let self = this;
    this.skillMapService.getSkillByDomain(params.get("domain"), function (data) {
      self.skills = data;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setStar(skill) {
    if (skill.rate) {
      let data = {skill: skill.text, ratings: skill.rate};
      this.skillMapService.addSkill(data);
    }

  }
}
