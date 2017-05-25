import {Component} from "@angular/core";
import {AnalyticsServices} from "../../../services/analytics.services";
import {Helper} from "../../../utils/helper";

@Component({
  selector: 'paper-page',
  templateUrl: 'paper.html',
  providers: [AnalyticsServices, Helper]
})

export class PaperPage {
  constructor(public helper: Helper) {

  }

  openUrl(url) {
    this.helper.openLink(url);
  }
}
