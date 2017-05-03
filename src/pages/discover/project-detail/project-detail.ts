import {Component} from "@angular/core";
import {NavParams, ToastController} from "ionic-angular";
import { Clipboard } from '@ionic-native/clipboard';
import "rxjs/add/operator/map";

@Component({
  templateUrl: "project-detail.html"
})

export class ProjectDetailPage {
  private subdomain;

  constructor(public params:NavParams, private toastCtrl: ToastController, private clipboard: Clipboard) {
    this.subdomain = params.get("subdomain");
  }

  copyItems(url) {
    this.clipboard.copy(url);
    let toast = this.toastCtrl.create({
      message: "链接已复制",
      duration: 1000,
      position: "middle"
    });
    toast.present();
  }

  openProject(url) {
    window.open(url, "_system", "location=yes");
  }
}
