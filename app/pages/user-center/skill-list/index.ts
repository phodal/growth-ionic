import {Component} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";
import {CORE_DIRECTIVES} from "@angular/common";
import {FORM_DIRECTIVES} from "@angular/forms";
import {RatingComponent} from "../../../components/ratings/index";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "build/pages/user-center/skill-list/index.html",
  directives: [RatingComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
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
