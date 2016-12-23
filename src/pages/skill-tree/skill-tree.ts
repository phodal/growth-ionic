import {Component, Renderer} from '@angular/core';
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
    event.srcElement.style.fill = '#2d89ef';
  }

  removePoint(event){
    event.srcEvent.srcElement.style.fill = '#ecf0f1';
  }
}
