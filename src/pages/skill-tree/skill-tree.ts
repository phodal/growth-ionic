import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {SKILL_TREE} from "../../data/SKILL_TREE";
import {filter} from "lodash";
import {SkillTreeModal} from "../../components/SkillTreeModal/SkillTreeModal";

@Component({
    selector: 'page-skill-tree',
    templateUrl: 'skill-tree.html'
})
export class SkillTreePage {

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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
