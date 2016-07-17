import {Component} from "@angular/core";
import {SkillMapService} from "../../services/skill.map.services";
import {FORM_DIRECTIVES} from "@angular/forms";
import {CORE_DIRECTIVES, NgClass} from "@angular/common";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";

@Component({
  templateUrl: "build/pages/analytics/index.html",
  providers: [SkillMapService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Analytics {
  private skillPointAmount;

  constructor(public skillMapService:SkillMapService) {
    this.skillPointAmount = this.getSkillPointAmount();
  }

  getSkillPointAmount() {
    let self = this;
    this.skillMapService.getSkillTotalAmount(function (points) {
      self.skillPointAmount = points;
    });
  }

  public radarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: false
  };

  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
