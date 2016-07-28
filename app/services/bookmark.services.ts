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

  getArticleBookmarkStatus(slug, callback) {
    this.getAllBookmarks().then(function (bookmarks) {
      if (!bookmarks || bookmarks === null) {
        callback(false);
      }
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks[slug]) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  toggleArticleBookmark(slug, title) {
    let self = this;
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks !== null && bookmarks[slug]) {
        self.remove(slug);
      } else {
        self.add(slug, title);
      }
    });
  }

  add(slug, title) {
    let self = this;
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks) {
        bookmarks[slug] = title;
        self.localStorage.set("bookmarks", JSON.stringify(bookmarks));
      } else {
        let bookmark = {};
        bookmark[slug] = title;
        self.localStorage.set("bookmarks", JSON.stringify(bookmark));
      }
    });
  }

  remove(slug) {
    let self = this;
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks) {
        delete bookmarks[slug];
        self.localStorage.set("bookmarks", JSON.stringify(bookmarks));
      }
    });
  }
}
