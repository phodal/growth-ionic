import {Component} from "@angular/core";

@Component({
  templateUrl: "build/pages/user-center/license/index.html",
})
export class LicensePage {
  constructor() {
  }

  launchUrl(url) {
    window.open(url, "_system", "location=yes");
  }
}
