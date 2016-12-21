import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {reverse} from "lodash";
import {Http} from "@angular/http";
import {ArticleDetailPage} from "../article-detail/article-detail";
import {Helper} from "../../../utils/helper";

@Component({
  templateUrl: "article-list.html",
  providers: [Helper],
})

export class ArticleListPage {
  private articles;

  constructor(private loadingCtrl: LoadingController, public nav: NavController, public http: Http, public helper: Helper) {

  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(this.helper.getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.articles + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.articles = reverse(data["content"]);
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(ArticleDetailPage, {title: title, url: SERVER_BASE_URL.articles + url});
  }
}
