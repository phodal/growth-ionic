import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: "build/pages/user-center/about-us/profile/index.html"
})

export class Profile {
  private person;
  constructor(public params:NavParams) {
    this.person = CONTRIBUTORS[params.get("num")];
  }

  openGithubUrl(name) {
    window.open("https://github.com/" + name,  "_system", "location=yes");
  }

  openBlogUrl(blog) {
    window.open(blog,  "_system", "location=yes");
  }
}
