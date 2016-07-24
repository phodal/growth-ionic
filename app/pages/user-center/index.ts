import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {SkillListPage} from "./skill-list/index";
import {AboutUsPage} from "./about-us/index";

@Component({
  templateUrl: "build/pages/user-center/index.html"
})
export class UserCenterPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openAllSkillListPage() {
    this.nav.push(SkillListPage);
  }

  openAboutUsPage() {
    this.nav.push(AboutUsPage);
  }
}
