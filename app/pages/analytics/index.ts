import {Component} from "@angular/core";
import {SkillMapService} from "../../services/skill.map.services";
import {FORM_DIRECTIVES} from "@angular/forms";
import {CORE_DIRECTIVES, NgClass} from "@angular/common";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {NavController} from "ionic-angular/index";
import {SkillListPage} from "./skill-list/index";

@Component({
  templateUrl: "build/pages/analytics/index.html",
  providers: [SkillMapService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Analytics {
  public radarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: false,
    legend: {
      display: false,
      labels: {
        fontColor: "rgb(255, 99, 132)"
      }
    }
  };
  public radarChartType:string = "radar";
  public radarChartLabels:string[] = ["Env", "Build", "Test", "Coding", "DevOps", "Design", "CI"];
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: "Series A"}
  ];

  private skillPointAmount;

  constructor(public nav:NavController, public skillMapService:SkillMapService) {
    this.skillPointAmount = this.getSkillPointAmount();
    this.nav = nav;
  }

  getSkillPointAmount() {
    let self = this;
    this.skillMapService.getSkillTotalAmount(function (points) {
      self.skillPointAmount = points;
    });
  }

  openAllSkillListPage() {
    this.nav.push(SkillListPage);
  }
}
