import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../../data/CONTRIBUTORS";
import {openLink} from "../../../../utils/helper";

@Component({
  templateUrl: "build/pages/user-center/about-us/profile/index.html"
})

export class Profile {
  private person;

  constructor(public params: NavParams) {
    this.person = CONTRIBUTORS[params.get("num")];
  }

  openGitHubUrl(name) {
    openLink("https://github.com/" + name);
  }

  openBlogUrl(blog) {
    openLink(blog);
  }
}
