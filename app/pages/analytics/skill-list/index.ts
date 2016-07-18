import {Component} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";

@Component({
  templateUrl: "build/pages/analytics/skill-list/index.html",
  providers: [SkillMapService]
})
export class SkillListPage {
  public allSkills;

  constructor(public skillMapService:SkillMapService) {
    this.skillMapService.getAllSKillsWithRate(
      data => this.allSkills = data
    );
  }
}
