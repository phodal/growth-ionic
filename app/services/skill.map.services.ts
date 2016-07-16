import {Injectable} from "@angular/core";
import {Storage, LocalStorage} from "ionic-angular/index";
@Injectable()
export class SkillMapService {
  private localStorage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
  };

  getSkills() {
    this.localStorage.get("skills").then(
      function (skills) {
        if (skills) {
          return JSON.parse(skills);
        } else {
          return {};
        }
      }
    );
  };

  addSkill(data) {
    let skills = this.getSkills();
    if (skills) {
      this.localStorage.set("skills", JSON.stringify(data));
    } else {
      this.localStorage.set("skills", JSON.stringify(data));
    }
  }
}
