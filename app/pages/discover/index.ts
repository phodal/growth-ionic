import {Component} from "@angular/core";
import {ExamListPage} from "./exam-list/index";
import {NavController, Platform} from "ionic-angular/index";
import {RecommendBook} from "./recommend-books/index";
import {RecommendArticles} from "./recommend-articles/index";
import {TWBookPage} from "./thoughtworks-books/index";
import {ToolboxListPage} from "./toolbox-list/index";
import {SolutionPage} from "./solution/index";
import {TodoListsPage} from "./todo-lists/index";
import {ArticleListPage} from "./article-list/index";
import {RoadMapPage} from "./roadmap-list/index";
import {ProjectListPage} from "./project-list/index";
import {BookTocPage} from "./chapter-list/index";
import {EmailComposer} from "ionic-native";
import {AnalyticsServices} from "../../services/analytics.services";

@Component({
  templateUrl: "build/pages/discover/index.html",
  providers: [AnalyticsServices]
})
export class DiscoverPage {
  constructor(public nav:NavController, private platform:Platform, private analytics:AnalyticsServices) {
    this.nav = nav;
    this.platform = platform;
    this.analytics.trackView("Discover");
  }

  openExamPage() {
    this.analytics.trackEvent("Discover Page", "exam");
    this.nav.push(ExamListPage);
  }

  openSolutionPage() {
    this.analytics.trackEvent("Discover Page", "solution");
    this.nav.push(SolutionPage);
  }

  openRecommendBookPage() {
    this.analytics.trackEvent("Discover Page", "recommend book");
    this.nav.push(RecommendBook);
  }

  openRecommendArticlePage() {
    this.analytics.trackEvent("Discover Page", "recommend article");
    this.nav.push(RecommendArticles);
  }

  openThoughtWorksBookPage() {
    this.analytics.trackEvent("Discover Page", "tw book");
    this.nav.push(TWBookPage);
  }

  openToolboxListPage() {
    this.analytics.trackEvent("Discover Page", "toolbox");
    this.nav.push(ToolboxListPage);
  }

  openArticlesListPage() {
    this.analytics.trackEvent("Discover Page", "article list");
    this.nav.push(ArticleListPage);
  }

  openTodoListsPage() {
    this.analytics.trackEvent("Discover Page", "todo list");
    this.nav.push(TodoListsPage);
  }

  openRoadMapPage() {
    this.analytics.trackEvent("Discover Page", "roadmap");
    this.nav.push(RoadMapPage);
  }

  openProjectListPage() {
    this.analytics.trackEvent("Discover Page", "project list");
    this.nav.push(ProjectListPage);
  }

  openEbook(slide) {
    this.analytics.trackEvent("Discover Ebook", slide.action);
    this.nav.push(BookTocPage, {title: slide.title, action: slide.action});
  }

  openGrowthGitHub() {
    window.open("https://github.com/phodal/growth/issues",  "_system", "location=yes");
  }

  sendEmail() {
    if (window.cordova) {
      EmailComposer.isAvailable().then((available:boolean) => {
        if (available) {
          let email = {
            to: "h@phodal.com",
            cc: "gmszone@qq.com",
            subject: "Growth反馈",
            body: "我希望可以有:",
            isHtml: true
          };

          EmailComposer.open(email);
        }
      });
    }
  }
}
