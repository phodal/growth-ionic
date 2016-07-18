import {Storage, LocalStorage} from "ionic-angular/index";
import {SkillMapService} from "./skill.map.services";

describe("Skill Map Services", () => {
  let skillMapService;

  beforeEach(() => {
    let localStorage = new Storage(LocalStorage);
    skillMapService = new SkillMapService();

    localStorage.set("skills", {
      "Npm": 5,
      "Grunt": 4,
      "Make": 5,
      "Gradle": 5,
      "JavaScript": 5,
      "HTML5": 5,
      "Java": 5,
      "Python": 5
    });
  });

  xit("should able add skill to localstorage", function (done) {
    skillMapService.addSkill({skill: "photoshop", rate: "5"});
    skillMapService.getSkills().then(function (data) {
      expect(JSON.stringify(JSON.parse(data))).toBe("");
      done();
    });
  });
});
