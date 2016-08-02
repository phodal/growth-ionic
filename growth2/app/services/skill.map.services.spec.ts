import {SkillMapService} from "./skill.map.services";
import {inject} from "@angular/core/testing";

describe("Skill Map Services", () => {
  let skillMapService;

  beforeEach(() => {
    skillMapService = new SkillMapService();
  });

  // TODO fix tests
  it("should able add skill to get skills by domain", inject([], () => {
    spyOn(localStorage, "setItem");
    skillMapService.addSkill({skill: "photoshop", rate: "5"});
    // expect(localStorage.setItem).toHaveBeenCalledWith("skills", "newToken");
  }));

  // TODO fix tests
  it("should able add skill to localstorage", () => {
    skillMapService.addSkill({skill: "photoshop", rate: "5"});
    skillMapService.getSkills().then(function (data) {
      expect(JSON.parse(data)).toBe(null);
    });
  });
});
