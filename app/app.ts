import {Platform, ionicBootstrap} from "ionic-angular";
import {TabsPage} from "./pages/tabs/tabs";
import {Component} from "@angular/core";
import {TRANSITION_IN_KEY, TRANSITION_OUT_KEY} from "./pages/effect/content-transition";
import {UserData} from "./providers/user-data";
import {disableDeprecatedForms, provideForms} from "@angular/forms";

@Component({
  template: "<ion-nav [root]='rootPage'></ion-nav>"
})
export class MyApp {
  private rootPage:any;

  constructor(private platform:Platform, private userData:UserData) {
    this.rootPage = TabsPage;
    this.initializeApp(platform);
    this.userData.logout();
  }

  private initializeApp(platform:Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hideSplashScreen();
    });
  }
  private hideSplashScreen() {
    if(navigator && navigator.splashscreen) {
      setTimeout(()=> {
        navigator.splashscreen.hide();
      }, 1000);
    }
  }
}

ionicBootstrap(MyApp, [UserData, disableDeprecatedForms(), provideForms()], {
  bodyContentEnter: TRANSITION_IN_KEY,
  bodyContentLeave: TRANSITION_OUT_KEY,
  tabbarPlacement: "bottom",
  tabsHideOnSubPages: true,
  tabsHighlight: true,
  backButtonText: "",
  modalEnter: "modal-slide-in",
  modalLeave: "modal-slide-out"
});
