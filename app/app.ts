import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {Component} from "@angular/core";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage:any = TabsPage;
  nextPage:any;

  constructor(platform:Platform) {
    this.initializeApp(platform);
  }

  private initializeApp(platform:Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#5e6772");
    });
  }
}

ionicBootstrap(MyApp)
