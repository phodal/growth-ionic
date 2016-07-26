import {Component} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";
import {CORE_DIRECTIVES} from "@angular/common";
import {FORM_DIRECTIVES} from "@angular/forms";
import {RatingComponent} from "../../../components/ratings/index";

@Component({
  templateUrl: "build/pages/main/skill-list/index.html",
  directives: [RatingComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
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
