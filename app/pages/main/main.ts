import {NavController, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {Day} from "../day/day";
import {Analytics} from "../analytics/index";

@Component({
  templateUrl: "build/pages/main/main.html"
})
export class MainView {
  private slides = [
    {
      title: "《Growth：全栈增长工程师指南》",
      intro: "这本书中不会教你所有的知识点，它用于帮你构建你的知识体系。",
      url: "https://github.com/phodal/growth-ebook"
    },
    {
      title: "《Growth：全栈增长工程师实战》",
      intro: "在Growth中我们介绍的只是一系列的实践，而Growth实战则会带领读者去履行这些实践。",
      url: "https://github.com/phodal/growth-in-action"
    },
    {
      title: "《Ideabook：练手项目集》",
      intro: "这个电子书的目标就是为这些Idea提供实战指南，一步步搭建你的未来。",
      url: "https://github.com/phodal/ideabook"
    }
  ];
  private slideOptions = {
    initialSlide: 0,
    autoplay: 5000,
    loop: true
  };

  constructor(public nav:NavController, private platform:Platform) {
    this.nav = nav;
    this.platform = platform;
  }

  openNavDetailsPage(day) {
    this.nav.push(Day, {day: day});
  }

  launch(url) {
    this.platform.ready().then(() => {
      window.open(url, "_system", "location=true");
    });
  }

  openAnalyticsPage() {
    this.nav.push(Analytics);
  }
}
