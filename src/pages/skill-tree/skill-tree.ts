import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-skill-tree',
  templateUrl: 'skill-tree.html'
})
export class SkillTreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  canAddPoints() {

  }

  hasPoints() {

  }

  hasMaxPoints() {

  }

  addPoint(event){
    console.log(event);
  }

  removePoint(event){
    console.log(event);
  }
}
