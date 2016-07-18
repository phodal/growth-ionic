import {Component} from "@angular/core";
import {SOLUTIONS} from "../../data/SOLUTIONS";
import * as _ from "lodash";

@Component({
  templateUrl: "build/pages/solution/index.html",
})
export class SolutionPage {
  private solutions;

  constructor() {
    this.solutions = _.orderBy(SOLUTIONS, ["type"], ["asc"]);
  }
}
