import {Component} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "skill-list.html",
  providers: [SkillMapService, AnalyticsServices]
})
export class SkillListPage {
  public allSkills;

  constructor(public skillMapService:SkillMapService, private analytics:AnalyticsServices) {
    this.skillMapService.getAllSKillsWithRate(
      data => this.allSkills = data
    );
    this.analytics.trackView("User Center: Skill List");
  }
}
