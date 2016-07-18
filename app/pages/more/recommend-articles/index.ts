import {Component} from "@angular/core";
import * as _ from "lodash";
import {HELPER_ARTICLES} from "../../../data/HELPER_ARTICLES";

@Component({
  templateUrl: "build/pages/more/recommend-articles/index.html"
})
export class RecommendArticles {
  private articles;
  constructor() {
    this.articles = _.values(HELPER_ARTICLES["zh-cn"]);
  }
}
