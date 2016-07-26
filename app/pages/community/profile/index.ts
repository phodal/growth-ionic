import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {getSpinnerConfig} from "../../../utils/helper";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {filter} from "lodash";
import {SanitizeHtml} from "../../../pipes/SanitizeHtml.pipe";

@Component({
  templateUrl: "build/pages/community/login/index.html",
  providers: [Http, HTTP_PROVIDERS],
})

export class LoginPage {
  private authType:string = "login";

  constructor(public http:Http) {
    this.http = http;
  }

  login(loginCreds) {

  }

  signup(signupCreds) {

  }
}
