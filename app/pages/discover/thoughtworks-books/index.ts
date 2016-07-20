import {Component} from "@angular/core";
import {TWBOOKS} from "../../../data/TWBOOKS";

@Component({
  templateUrl: "build/pages/discover/thoughtworks-books/index.html"
})
export class TWBookPage {
  private twbooks;
  constructor() {
    this.twbooks = TWBOOKS['zh-cn'];
  }
}
