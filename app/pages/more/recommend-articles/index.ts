import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";
import * as _ from "lodash";
import {HELPER_ARTICLES} from "../../../data/HELPER_ARTICLES";

@Component({
  templateUrl: "build/pages/more/recommend-articles/index.html"
})
export class RecommendArticles {
  private books;
  constructor() {
    this.books = _.orderBy(HELPER_ARTICLES["zh-cn"], ["category"], ["asc"]);
  }
}
