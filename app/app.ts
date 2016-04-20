import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {provide} from 'angular2/core';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http} from "angular2/http";

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios'
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
    provide(TranslateLoader, {
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    TranslateService
  ]
})
export class MyApp {
  rootPage: any = TabsPage;
  private translate;

  constructor(platform: Platform, translate: TranslateService) {
    this.translate = translate;
    this.initializeApp(platform);
    this.translationConfig();
  }

  private initializeApp(platform:Platform){
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#5e6772");
          });
      }

  translationConfig() {
    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(zh-cn|en)/gi.test(userLang) ? userLang : 'en';

    // optional, default is "en"
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }
}
