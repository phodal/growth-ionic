import {Component} from "@angular/core";
import {SkillMapService} from "../../services/skill.map.services";

@Component({
  templateUrl: "build/pages/analytics/index.html",
  providers: [SkillMapService]
})
export class Analytics {
  private skillPointAmount;
  constructor(public skillMapService:SkillMapService) {
    this.skillPointAmount = this.getSkillPointAmount();
  }

  getSkillPointAmount() {
    let self = this;
    this.skillMapService.getSkillTotalAmount(function(points){
      self.skillPointAmount = points;
    });
  }
}
