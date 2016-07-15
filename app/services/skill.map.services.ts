import {Injectable} from "@angular/core";
import {Storage, LocalStorage} from "ionic-angular/index";
@Injectable()
export class SkillMapService {
  private localStorage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
  };

  getItem() {
    let localStorage = this.localStorage;
    if (localStorage) {
      return JSON.parse(localStorage);
    }
  };

  addItem(data) {
    this.localStorage.set("skills", JSON.stringify(data))
  }
}
