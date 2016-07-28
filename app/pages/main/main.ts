import {NavController, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {SlideBookTocPage} from "./slider-list/index";
import {Day} from "./day/day";
import {Section} from "./section/index";

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

  openSectionDetailsPage(section) {
    this.nav.push(Section, {section: section});
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
