import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../../data/CONTRIBUTORS";

@Component({
  templateUrl: "build/pages/user-center/about-us/profile/index.html"
})

export class Profile {
  private person;
  constructor(public params:NavParams) {
    this.person = CONTRIBUTORS[params.get("num")];
  }

  openGitHubUrl(name) {
    window.open("https://github.com/" + name,  "_system", "location=yes");
  }

  openBlogUrl(blog) {
    window.open(blog,  "_system", "location=yes");
  }
}
