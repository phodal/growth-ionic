import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";

@Component({
  templateUrl: "build/pages/more/about-us/index.html"
})
export class AboutUs {
  private contributors;
  constructor() {
    this.contributors = CONTRIBUTORS;
  }
}
