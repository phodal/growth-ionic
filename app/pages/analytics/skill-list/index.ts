import {Component} from "@angular/core";
import {ALL_SKILLS} from "../../../data/ALL_SKILLS";

@Component({
  templateUrl: "build/pages/analytics/skill-list/index.html"
})
export class SkillListPage {
  private allSkills;

  constructor() {
    this.allSkills = ALL_SKILLS;
  }

  setStar(skill, $event) {

  }
}
