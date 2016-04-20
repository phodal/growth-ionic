import {Page} from 'ionic-angular';
import {NavController, TranslatePipe} from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Page({
  templateUrl: 'build/pages/day/day1.html'
})
class Day1 {
  constructor() {
  }
}

@Page({
  templateUrl: 'build/pages/main/main.html',
  pipes: [TranslatePipe]
})
export class MainView {
  constructor(public nav:NavController) {
    
  }

  openNavDetailsPage() {
    this.nav.push(Day1);
  }
}
