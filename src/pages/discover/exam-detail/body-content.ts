import {Animation, NavController} from "ionic-angular";

import {PageOne} from "./content-one";
import {Component, ViewChild} from "@angular/core";
import {TRANSITION_OUT_KEY, TRANSITION_IN_KEY} from "../../effect/content-transition";

@Component({
  selector: `body-content`,
  template: `
    <ion-nav [root]="rootPage" #nav class="content-nav"></ion-nav>
  `
})
export class BodyContent {
  @ViewChild("nav") nav:NavController;
  private questions;

  processTransition(previousIndex:number, selectedIndex:number, animation:Animation) {
    if (previousIndex > selectedIndex) {
      return this.nav.pop({animation: TRANSITION_OUT_KEY, ev: {animation: animation}});
    } else {
      let question = this.questions[selectedIndex];
      return this.nav.push(PageOne, {question: question}, {
        animation: TRANSITION_IN_KEY,
        ev: {animation: animation}
      });
    }
  }

  setQuestions(questionsWithShuffle) {
    this.questions = questionsWithShuffle;
  }
}
