import {NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {Day1} from "../day/day";


@Component({
  templateUrl: 'build/pages/main/main.html'
})
export class MainView {
  constructor(public nav:NavController) {

  }

  setPages() {
    this.nav.setPages([{page: Day1}], {
      animate: true
    });
  }

  openNavDetailsPage() {
    this.nav.push(Day1);
  }
}
