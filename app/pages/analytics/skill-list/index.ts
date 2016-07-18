import {Component, Pipe, PipeTransform} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";

@Pipe({name: "keysPipe"})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]):any {
    let keys = [];
    for (let key in value) {
      if(key && value) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}

@Component({
  templateUrl: "build/pages/analytics/skill-list/index.html",
  providers: [SkillMapService],
  pipes: [KeysPipe]
})
export class SkillListPage {
  private allSkills;

  constructor(public skillMapService:SkillMapService) {
    this.allSkills = this.skillMapService.getAllSKillsWithRate();
  }

  setStar(skill, $event) {

  }
}
