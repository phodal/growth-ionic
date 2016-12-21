import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Section} from "../pages/home/section/section";
import {HtmlModal} from "../components/HtmlModal/HtmlModal";
import {SanitizeHtml} from "../pipes/SanitizeHtml.pipe";
import {BookListModal} from "../components/BookListModal/BookListModal";
import {TodoModal} from "../components/TodoModal/TodoModal";
import {SkillModal} from "../components/SkillModal/SkillModal";
import {Ionic2RatingModule} from "ionic2-rating";
import {DiscoverPage} from "../pages/discover/discover";
import {ArticleDetailPage} from "../pages/discover/article-detail/article-detail";
import {ArticleListPage} from "../pages/discover/article-list/article-list";
import {ChapterDetailPage} from "../pages/discover/chapter-detail/chapter-detail";
import {ChapterListPage} from "../pages/discover/chapter-list/chapter-list";
import {ProjectDetailPage} from "../pages/discover/project-detail/project-detail";
import {ProjectListPage} from "../pages/discover/project-list/project-list";
import {RecommendArticles} from "../pages/discover/recommend-articles/recommend-articles";
import {RecommendBook} from "../pages/discover/recommend-books/recommend-books";
import {RoadMapDetailPage} from "../pages/discover/roadmap-detail/roadmap-detail";
import {RoadMapPage} from "../pages/discover/roadmap-list/roadmap-list";
import {SolutionPage} from "../pages/discover/solution/solution";
import {TWBookPage} from "../pages/discover/thoughtworks-books/thoughtworks-books";
import {TodoListsPage} from "../pages/discover/todo-lists/todo-lists";
import {ToolboxDetailPage} from "../pages/discover/toolbox-detail/toolbox-detail";
import {ToolboxListPage} from "../pages/discover/toolbox-list/toolbox-list";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    DiscoverPage,
    HomePage,
    Section,
    HtmlModal,
    TodoModal,
    SkillModal,
    BookListModal,
    SanitizeHtml,
    ArticleDetailPage,
    ArticleListPage,
    ChapterListPage,
    ChapterDetailPage,
    ProjectDetailPage,
    ProjectListPage,
    RecommendArticles,
    RecommendBook,
    RoadMapDetailPage,
    RoadMapPage,
    SolutionPage,
    TWBookPage,
    TodoListsPage,
    ToolboxDetailPage,
    ToolboxListPage,
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
    DiscoverPage,
    HomePage,
    Section,
    BookListModal,
    HtmlModal,
    TodoModal,
    SkillModal,
    ArticleDetailPage,
    ArticleListPage,
    ChapterListPage,
    ChapterDetailPage,
    ProjectDetailPage,
    ProjectListPage,
    RecommendArticles,
    RecommendBook,
    RoadMapDetailPage,
    RoadMapPage,
    SolutionPage,
    TWBookPage,
    TodoListsPage,
    ToolboxDetailPage,
    ToolboxListPage,
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
