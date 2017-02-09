import {Component, ViewChild} from "@angular/core";
import {Platform, ToastController, IonicApp, Nav, Keyboard} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {HomePage} from "../pages/home/home";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  public backButtonPressed: boolean;
  @ViewChild('rootNavController') nav: Nav;

  constructor(public platform: Platform, public toastCtrl: ToastController, public ionicApp: IonicApp,
              private Keyboard: Keyboard) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.registerBackButtonAction();
    });
  }

  registerBackButtonAction() {
    let ready = true;

    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      let activePortal = this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => {
          ready = true;
        });
        return;
      }

      if (this.Keyboard.isOpen()) {
        this.Keyboard.close();
        return;
      }

      let view = this.nav.getActive();
      //noinspection TypeScriptUnresolvedVariable
      let page = view ? this.nav.getActive().instance : null;

      if (page && page instanceof HomePage) {
        this.showExit();
      } else if (this.nav.canGoBack() || view && view.isOverlay) {
        ready = false;
        this.nav.pop().then(() => { ready = true; });
      } else if(!activePortal) {
        this.nav.setRoot(TabsPage);
      }
    }, 1);
  }

  showExit() {
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
