import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";
import * as _ from "lodash";

@Component({
  templateUrl: "build/pages/more/recommend-books/index.html"
})
export class RecommendBook {
  private books;
  constructor() {
    this.books = _.orderBy(BOOKS, ["category"], ["asc"]);
  }
}
