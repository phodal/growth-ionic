import {Component} from "@angular/core";
import {ModalController} from "ionic-angular";

@Component({
  selector: "donate",
  templateUrl: "donate.html"
})
export class DonatePage {
  constructor(private modalCtrl:ModalController) {

  }
}
