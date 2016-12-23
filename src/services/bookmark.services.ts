import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class BookmarkServices {
  constructor(public storage: Storage) {

  };

  getAllBookmarks() {
    return this.storage.get("bookmarks");
  };

  getBookmarkCount(cb){
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      let bookmarkCount = Object.keys(bookmarks).length;
      cb(bookmarkCount);
    });
  }

  getArticleBookmarkStatus(slug, callback) {
    this.getAllBookmarks().then(function (bookmarks) {
      if (!bookmarks || bookmarks === null) {
        return callback(false);
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
        self.storage.set("bookmarks", JSON.stringify(bookmarks));
      } else {
        let bookmark = {};
        bookmark[slug] = title;
        self.storage.set("bookmarks", JSON.stringify(bookmark));
      }
    });
  }

  remove(slug) {
    let self = this;
    this.getAllBookmarks().then(function (bookmarks) {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks) {
        delete bookmarks[slug];
        self.storage.set("bookmarks", JSON.stringify(bookmarks));
      }
    });
  }
}
