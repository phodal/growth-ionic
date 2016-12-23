import {Animation, NavController} from "ionic-angular";
import {PageOne} from "./content-one";
import {Component, ViewChild, Input} from "@angular/core";

@Component({
  selector: `body-content`,
  template: `<ion-nav [root]="rootPage" #nav class="content-nav"></ion-nav>`
})

export class BodyContent {
  @Input() selectedIndex:number;

  @ViewChild("nav") nav:NavController;
  private questions;

  processTransition(previousIndex:number, selectedIndex:number, animation:Animation) {
    if (previousIndex > selectedIndex) {
      return this.nav.pop({animation: 'fade-transition', ev: {animation: animation}});
    } else {
      let question = this.questions[selectedIndex];
      return this.nav.push(PageOne, {question: question}, {
        animation: 'fade-transition',
        ev: {animation: animation}
      });
    }
  }

  setQuestions(questionsWithShuffle) {
    this.questions = questionsWithShuffle;
  }
}
