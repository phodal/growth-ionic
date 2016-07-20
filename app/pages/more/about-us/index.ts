import {Component} from "@angular/core";

@Component({
  templateUrl: "build/pages/more/about-us/index.html"
})
export class AboutUs {
  private books;
  constructor() {
    this.books = "1";
  }
}
