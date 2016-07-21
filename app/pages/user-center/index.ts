import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/more/index.html"
})
export class UserCenterPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }
}
