import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";

@Component({
  templateUrl: "build/pages/more/recommend-books/index.html"
})
export class RecommendBook {
  private books;
  constructor() {
    this.books = BOOKS;
  }
}
