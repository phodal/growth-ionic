import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../../data/CONTRIBUTORS";
import {Helper} from "../../../../utils/helper";

@Component({
  templateUrl: "profile.html",
  providers: [Helper]
})

export class Profile {
  private person;

  constructor(public params: NavParams, public helper: Helper) {
    this.person = CONTRIBUTORS[params.get("num")];
  }

  openGitHubUrl(name) {
    this.helper.openLink("https://github.com/" + name);
  }

  openBlogUrl(blog) {
    this.helper.openLink(blog);
  }
}
