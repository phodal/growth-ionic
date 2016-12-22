import {Component, ViewChild} from "@angular/core";
import {PageObject, AnimationReadyEvent} from "../../effect/paging-conponents";
import {BodyContent} from "./body-content";
import {NavParams, NavController, GestureController} from "ionic-angular";
import {QUIZS} from "../../../data/QUIZS";
import * as _ from "lodash";

@Component({
  selector: "exam-detail",
  templateUrl: "exam-detail.html",
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

  constructor(public params:NavParams, public nav:NavController, public gestureController:GestureController) {
    this.domain = params.get("domain");
    this.allQuestions = QUIZS[this.domain];
    this.questionsWithShuffle = this.shuffleQuestion(this.allQuestions);
    this.gestureController = gestureController;
  }

  ionViewWillEnter() {
    this.gestureController.disableScroll(1);
    let tempPages:PageObject[] = [];
    tempPages.push({iconName: "ionic"});
    tempPages.push({iconName: "aperture"});
    tempPages.push({iconName: "at"});
    tempPages.push({iconName: "baseball"});
    tempPages.push({iconName: "basket"});
    tempPages.push({iconName: "beer"});
    tempPages.push({iconName: "bicycle"});
    tempPages.push({iconName: "boat"});
    tempPages.push({iconName: "bonfire"});
    tempPages.push({iconName: "bowtie"});
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

  endExam() {
    this.nav.pop();
  }

  pageChangeAnimationReady(event:AnimationReadyEvent = {animation: null}) {
    let questions = this.questionsWithShuffle;
    if (this.questionsWithShuffle.length > this.questionsNum) {
      questions = _.dropRight(questions, this.questionsWithShuffle.length - this.questionsNum);
    }
    this.bodyContent.setQuestions(questions);
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
      });
    });
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
