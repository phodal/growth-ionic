import {Component} from "@angular/core";
import {NavController, ModalController, Platform} from "ionic-angular";
import {SKILL_TREE} from "../../data/SKILL_TREE";
import {filter} from "lodash";
import {SkillTreeModal} from "../../components/SkillTreeModal/SkillTreeModal";
import {Helper} from "../../utils/helper";

@Component({
  selector: 'page-skill-tree',
  templateUrl: 'skill-tree.html',
  providers: [Helper]
})
export class SkillTreePage {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public helper: Helper, public platform: Platform) {

  }

  ionViewDidLoad() {

  }

  canAddPoints() {

  }

  hasPoints() {

  }

  hasMaxPoints() {

  }

  getProfessional() {
    var url = 'http://phodal.github.io/motree';
    if(this.platform.is('android')) {
      url = 'market://details?id=ren.growth.skilltree'
    } else if(this.platform.is('ios')) {
      url = 'https://itunes.apple.com/cn/app/growth-ji-neng-shu-phodal/id1193898864?mt=8'
    }
    this.helper.openLink(url);
  };

  addPoint(event) {
    event.srcElement.style.fill = '#2d89ef';
    let pointId = event.srcElement.parentElement.getAttribute('id');
    this.presentSkillModal(pointId);
  }

  removePoint(event) {
    event.srcEvent.srcElement.style.fill = '#ecf0f1';
  }

  presentSkillModal(pointId) {
    let skill = filter(SKILL_TREE, {"id": parseInt(pointId)})[0];
    let modal = this.modalCtrl.create(SkillTreeModal, {skill: skill});
    modal.present();

  }
}
