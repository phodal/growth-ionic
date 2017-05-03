import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {AnalyticsServices} from "../../services/analytics.services";
import {SolutionPage} from "./solution/solution";
import {RecommendBook} from "./recommend-books/recommend-books";
import {RecommendArticles} from "./recommend-articles/recommend-articles";
import {TWBookPage} from "./thoughtworks-books/thoughtworks-books";
import {ToolboxListPage} from "./toolbox-list/toolbox-list";
import {TodoListsPage} from "./todo-lists/todo-lists";
import {ArticleListPage} from "./article-list/article-list";
import {RoadMapPage} from "./roadmap-list/roadmap-list";
import {ProjectListPage} from "./project-list/project-list";
import { EmailComposer } from '@ionic-native/email-composer';
import {ChapterListPage} from "./chapter-list/chapter-list";
import {Helper} from "../../utils/helper";
import {ExamListPage} from "./exam-list/exam-list";

@Component({
  selector: 'discover-page',
  templateUrl: "discover.html",
  providers: [AnalyticsServices, Helper]
})
export class DiscoverPage {
  private emailComposer: EmailComposer;

  constructor(public nav: NavController, private platform: Platform, public analytics: AnalyticsServices, public helper: Helper) {
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
    this.nav.push(ChapterListPage, {title: slide.title, action: slide.action});
  }

  openGitHub(links) {
    this.helper.openLink(links);
  }

  sendEmail() {
    if (this.platform.is('cordova')) {
      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          let email = {
            to: "h@phodal.com",
            cc: "gmszone@qq.com",
            subject: "Growth反馈",
            body: "我希望可以有:",
            isHtml: true
          };

          this.emailComposer.open(email);
        }
      });
    }
  }
}
