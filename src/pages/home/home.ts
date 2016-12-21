import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';

import {Section} from "./section/section";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private shownGroup = false;

  constructor(public navCtrl: NavController) {

  }

  openSectionDetailsPage(section) {
    this.navCtrl.push(Section, {section: section});
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
