import {Component} from "@angular/core";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  selector: 'paper-page',
  templateUrl: 'paper.html',
  providers: [AnalyticsServices]
})

export class PaperPage {
  constructor() {

  }
}
