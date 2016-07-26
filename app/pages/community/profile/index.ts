import {Component} from "@angular/core";
import "rxjs/add/operator/map";
import {UserData} from "../../../providers/user-data";

@Component({
  templateUrl: "build/pages/community/profile/index.html",
})

export class LoginPage {
  private loginInfo: {username?: string, password?: string} = {};
  private submitted = false;

  constructor(private userData: UserData) {
  }

  doLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.loginInfo);
    }
  }

  signup(signupCreds) {

  }
}
