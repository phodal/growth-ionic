import {Injectable} from "@angular/core";
import {Storage, LocalStorage} from "ionic-angular/index";

@Injectable()
export class SkillMapService {
  private localStorage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
  };

  getSkills() {
    return this.localStorage.get("skills");
  };

  addSkill(data) {
    let self = this;
    this.getSkills().then(function (skills) {
      skills = JSON.parse(skills);
      if (skills) {
        skills[data.skill] = data.ratings;
        self.localStorage.set("skills", JSON.stringify(skills));
      } else {
        let skill = {};
        skill[data.skill] = data.ratings;
        self.localStorage.set("skills", JSON.stringify(skill));
      }
    });
  }
}
