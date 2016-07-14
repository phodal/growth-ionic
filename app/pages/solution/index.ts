import {Component} from "@angular/core";
import {SOLUTIONS} from "../../data/SOLUTIONS";

@Component({
  templateUrl: "build/pages/solution/index.html",
})
export class SolutionPage {
  private solutions;

  constructor() {
    this.solutions = SOLUTIONS;
  }
}
