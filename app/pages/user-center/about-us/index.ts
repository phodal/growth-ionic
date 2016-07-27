import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular/index";
import {Profile} from "./profile/index";
import {AppVersion} from "ionic-native/dist/index";

@Component({
  templateUrl: "build/pages/user-center/about-us/index.html"
})

export class AboutUsPage {
  private contributors;
  private version;

  constructor(public nav:NavController) {
    this.nav = nav;
    this.contributors = CONTRIBUTORS;
    this.init();
  }

  openProfilePage(num) {
    this.nav.push(Profile, {num: num});
  }

  private init() {
    if (window.cordova) {
      let self = this;
      AppVersion.getVersionNumber().then(
        version => self.version = version
      );
    }
  }
}
