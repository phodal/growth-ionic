import {Component, Pipe, PipeTransform} from "@angular/core";
import {ALL_SKILLS} from "../../../data/ALL_SKILLS";

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
  pipes: [KeysPipe]
})
export class SkillListPage {
  private allSkills;

  constructor() {
    this.allSkills = ALL_SKILLS;
  }

  setStar(skill, $event) {

  }
}
