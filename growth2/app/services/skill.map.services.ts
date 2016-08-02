import {Injectable} from "@angular/core";
import {Storage, LocalStorage} from "ionic-angular/index";
import * as _ from "lodash";
import {ALL_SKILLS} from "../data/ALL_SKILLS";

@Injectable()
export class SkillMapService {
  private localStorage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
  };

  getSkills() {
    return this.localStorage.get("skills");
  };

  getAllSKillsWithRate(callback) {
    this.getSkills().then(function (localSkills) {
      let skillsWithRate = [];
      if (localSkills) {
        localSkills = JSON.parse(localSkills);
        _.each(localSkills, function (localSkillValue, localSkillKey) {
          skillsWithRate.push({skill: localSkillKey, rate: localSkillValue});
        });
      }
      callback(skillsWithRate);
    });
  }

  getSkillTotalAmount(callback) {
    let points = 0;
    this.getSkills().then(function (skills) {
      if (skills) {
        skills = JSON.parse(skills);
        _.each(skills, function (point) {
          points = points + point;
        });
      }
      callback(points);
    });
  };

  countSkillsByDomain(callback) {
    let points = [];
    this.getSkills().then(function (skills) {
      if (skills) {
        skills = JSON.parse(skills);
        _.each(skills, function (point) {
          points = points + point;
        });
      }
      callback(points);
    });
  }

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

  getSkillByDomain(domain:any, callback) {
    let domainSkills = [];
    this.getSkills().then(function (localSkills) {
      domainSkills = ALL_SKILLS[domain];

      if (localSkills) {
        localSkills = JSON.parse(localSkills);
        _.each(localSkills, function (loalSkillValue, localSkillKey) {
          _.each(domainSkills, function (domainSkill, index) {
            if (domainSkill.text === localSkillKey) {
              domainSkills[index].rate = loalSkillValue;
            }
          });
        });
      }
      callback(domainSkills);
    });
  }
}
