import {Component} from "@angular/core";
import "rxjs/add/operator/map";
import {UserData} from "../../../providers/user-data";
import {Events, NavController, ToastController, LoadingController} from "ionic-angular/index";
import {getSpinnerConfig} from "../../../utils/helper";

@Component({
  templateUrl: "build/pages/community/profile/index.html",
})

export class LoginPage {
  private loginInfo:{username?:string, password?:string} = {};
  private submitted = false;
  private loading;

  constructor(public nav:NavController, private userData:UserData, private events:Events,
              private toastCtrl:ToastController, private loadingCtrl:LoadingController) {
    this.events = events;
    this.eventHandle();
  }

  doLogin(form) {
    this.submitted = true;
    this.loading = this.loadingCtrl.create(getSpinnerConfig());
    this.loading.present();

    if (form.valid) {
      this.userData.login(this.loginInfo, this.loading);
    }
  }

  signup(signupCreds) {

  }

  private eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      let toast = self.toastCtrl.create({
        message: "欢迎回来," + userEventData,
        duration: 2000,
        position: "top"
      });
      toast.present();

      self.nav.pop();
    });
  }
}
