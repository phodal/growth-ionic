import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular/index";
import {Profile} from "./profile/index";

@Component({
  templateUrl: "build/pages/user-center/about-us/index.html"
})

export class AboutUsPage {
  private contributors;
  constructor(public nav:NavController) {
    this.nav = nav;
    this.contributors = CONTRIBUTORS;
  }

  openProfilePage(num) {
    this.nav.push(Profile, {num: num});
  }
}
