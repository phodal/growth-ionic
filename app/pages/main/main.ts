import {NavController, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {SlideBookTocPage} from "./slider-list/index";
import {Day} from "./day/day";

@Component({
  templateUrl: "build/pages/main/main.html"
})
export class MainView {
  private shownGroup = false;

  constructor(public nav:NavController, private platform:Platform) {
    this.nav = nav;
    this.platform = platform;
  }

  openNavDetailsPage(day) {
    this.nav.push(Day, {day: day});
  }

  launch(slide) {
    this.nav.push(SlideBookTocPage, {title: slide.title, action: slide.action});
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
