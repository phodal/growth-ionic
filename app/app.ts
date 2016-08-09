import {Platform, ionicBootstrap} from "ionic-angular";
import {Component} from "@angular/core";
import {TRANSITION_IN_KEY, TRANSITION_OUT_KEY} from "./pages/effect/content-transition";
import {UserData} from "./providers/user-data";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {TutorialPage} from "./pages/tutorial/tutorial";
import {StatusBar, Splashscreen} from "ionic-native";

@Component({
  template: "<ion-nav [root]='rootPage'></ion-nav>"
})
export class MyApp {
  private rootPage:any;

  constructor(private platform:Platform, private userData:UserData) {
    this.rootPage = TutorialPage;
    this.initializeApp(platform);
    this.userData.logout();
  }

  private initializeApp(platform:Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

ionicBootstrap(MyApp, [UserData, disableDeprecatedForms(), provideForms()], {
  bodyContentEnter: TRANSITION_IN_KEY,
  bodyContentLeave: TRANSITION_OUT_KEY,
  tabbarPlacement: "bottom",
  tabsHideOnSubPages: true,
  tabsHighlight: true
});
