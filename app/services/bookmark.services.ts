import {Injectable} from "@angular/core";
import {Storage, LocalStorage} from "ionic-angular/index";

@Injectable()
export class BookmarkServices {
  private localStorage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
  };

  getAllBookmarks() {
    return this.localStorage.get("bookmarks");
  };

  getCurrentArticleBookmarkStatus() {

  }

  add(slug) {
    let self = this;
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks) {
        bookmarks[slug] = true;
        self.localStorage.set("bookmarks", JSON.stringify(bookmarks));
      } else {
        let bookmark = {};
        bookmark[slug] = true;
        self.localStorage.set("bookmarks", JSON.stringify(bookmark));
      }
    });
  }
}
