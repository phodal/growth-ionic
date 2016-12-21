import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Section} from "../pages/home/section/section";
import {HtmlModal} from "../components/HtmlModal/HtmlModal";
import {SanitizeHtml} from "../pipes/SanitizeHtml.pipe";
import {BookListModal} from "../components/BookListModal/BookListModal";
import {TodoModal} from "../components/TodoModal/TodoModal";
import {SkillModal} from "../components/SkillModal/SkillModal";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Section,
    HtmlModal,
    TodoModal,
    SkillModal,
    BookListModal,
    SanitizeHtml,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Section,
    BookListModal,
    HtmlModal,
    TodoModal,
    SkillModal,
    TabsPage
  ],
  providers: [
    Storage,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
