import {Component, ViewChild} from "@angular/core";
import {PagingComponent, PageObject, AnimationReadyEvent} from "../../effect/paging-conponents";
import {BodyContent} from "./body-content";
import {NavParams} from "ionic-angular/index";
import {QUIZS} from "../../../data/QUIZS";
import * as _ from "lodash";

@Component({
  directives: [BodyContent, PagingComponent],
  templateUrl: "build/pages/discover/exam-detail/index.html",
})
export class ExamDetailPage {
  @ViewChild("bodyContent") bodyContent:BodyContent;

  private pages:PageObject[];

  private activeIndex:number = 0;
  private nextIndex:number = 0;
  private questionsNum:number = 10;
  private domain:string;
  private allQuestions;
  private questionsWithShuffle;

  constructor(public params:NavParams) {
    this.domain = params.get("domain");
    this.allQuestions = QUIZS[this.domain];
    this.questionsWithShuffle = this.shuffleQuestion(this.allQuestions);
  }

  ionViewWillEnter() {
    let tempPages:PageObject[] = [];
    tempPages.push({iconName: "ionic"});
    tempPages.push({iconName: "cloud-outline"});
    tempPages.push({iconName: "ionitron"});
    this.pages = tempPages;
    this.pageChangeAnimationReady();
  }

  swipeLeftToRight() {
    if (this.nextIndex < this.pages.length - 1) {
      this.nextIndex++;
    }
  }

  swipeRightToLeft() {
    if (this.nextIndex > 0) {
      this.nextIndex--;
    }
  }

  pageChangeAnimationReady(event:AnimationReadyEvent = {animation: null}) {
    this.bodyContent.processTransition(this.activeIndex, this.nextIndex, event.animation).then(() => {
      this.activeIndex = this.nextIndex;
    });
  }

  private shuffleQuestion(originQuestions) {
    let questions = [];
    _.each(this.shuffle(originQuestions), function (question, index) {
      questions.push({
        id: index,
        question: question
      })
    });
    console.log(questions);
    return questions;
  }

  private shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
