import {Component} from "@angular/core";
import "rxjs/add/operator/map";
import {UserData} from "../../../providers/user-data";
import {Events, NavController, ToastController} from "ionic-angular/index";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "build/pages/community/profile/index.html",
  providers: [AnalyticsServices]
})

export class LoginPage {
  private loginInfo:{username?:string, password?:string} = {};
  private submitted = false;
  private isLogining = false;
  private hasLogin = false;
  private isLoginError = false;

  constructor(public nav:NavController, private userData:UserData, private events:Events,
              private toastCtrl:ToastController, private analytics:AnalyticsServices) {
    this.events = events;
    this.init();
    this.eventHandle();
  }

  doLogin(form) {
    this.submitted = true;
    this.isLogining = true;

    if (form.valid) {
      this.userData.login(this.loginInfo);
    }
  }

  logout() {
    this.userData.logout();
    this.nav.pop();
  }

  private eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      self.isLogining = false;
      let toast = self.toastCtrl.create({
        message: "欢迎回来," + userEventData,
        duration: 2000,
        position: "top"
      });
      toast.present();
      self.analytics.trackEvent("Login", "Successful");

      self.nav.pop();
    });

    this.events.subscribe("user:login:error", () => {
      self.isLoginError = true;
      self.isLogining = false;
    });
  }

  private init() {
    let self = this;
    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );
  }
}
