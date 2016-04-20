import {NavController, Platform} from 'ionic-angular';
import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/day/day1.html'
})
class Day1 {
  constructor() {

  }
}

@Page({
  templateUrl: 'build/pages/main/main.html'
})
export class MainView {
  constructor(public nav:NavController) {
  }

  openNavDetailsPage() {
    this.nav.push(Day1);
  }
}
