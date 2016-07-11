import {NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {Day} from "../day/day";


@Component({
  templateUrl: 'build/pages/main/main.html'
})
export class MainView {
  constructor(public nav:NavController) {

  }

  setPages() {
    this.nav.setPages([{page: Day}], {
      animate: true
    });
  }

  openNavDetailsPage() {
    this.nav.push(Day);
  }
}
