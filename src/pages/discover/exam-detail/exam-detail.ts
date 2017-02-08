import {Component, ViewChild, ElementRef} from "@angular/core";
import {PageObject, AnimationReadyEvent} from "../../effect/paging-conponents";
import {BodyContent} from "./body-content";
import {NavParams, NavController, GestureController, Animation, Platform} from "ionic-angular";
import {QUIZS} from "../../../data/QUIZS";
import * as _ from "lodash";

@Component({
  selector: "exam-detail",
  templateUrl: "exam-detail.html",
})
export class ExamDetailPage {
  @ViewChild("bodyContent") bodyContent: BodyContent;
  @ViewChild("bodyContent", {read: ElementRef}) content: ElementRef;

  private pages: PageObject[];

  private activeIndex: number = 0;
  private nextIndex: number = 0;
  private questionsNum: number = 10;
  private domain: string;
  private allQuestions;
  private questionsWithShuffle;

  constructor(public params: NavParams, public nav: NavController, public gestureController: GestureController, public plt: Platform) {
    this.domain = params.get("domain");
    this.allQuestions = QUIZS[this.domain];
    this.questionsWithShuffle = this.shuffleQuestion(this.allQuestions);
    this.gestureController = gestureController;
  }

  ionViewWillEnter() {
    this.gestureController.disableScroll(1);
    let tempPages: PageObject[] = [];
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

  pageChangeAnimationReady(event: AnimationReadyEvent = {animation: null}) {
    let questions = this.questionsWithShuffle;
    if (this.questionsWithShuffle.length > this.questionsNum) {
      questions = _.dropRight(questions, this.questionsWithShuffle.length - this.questionsNum);
    }
    this.bodyContent.setQuestions(questions);
    this.exchangeAnimation(this.activeIndex, this.nextIndex);

    this.bodyContent.processTransition(this.activeIndex, this.nextIndex, event.animation).then(() => {
      this.activeIndex = this.nextIndex;
    });
  }

  private exchangeAnimation(previousIndex, selectedIndex) {
    let component = this.content.nativeElement.querySelectorAll('body-content > ion-nav ng-component');
    let currentComponent = component[this.activeIndex];
    let componentAnimation = new Animation(this.plt, currentComponent);

    if (previousIndex >= selectedIndex) {
      componentAnimation
        .fromTo('opacity', 0, 1)
        .easing('ease-in')
        .duration(500);

      if (currentComponent) {
        currentComponent.style.opacity = 1;
      }
    } else {
      componentAnimation
        .fromTo('opacity', 0.5, 0)
        .easing('ease-out')
        .duration(500);
    }
    componentAnimation.play();
  }

  shuffleQuestion(originQuestions) {
    let questions = [];
    _.each(this.shuffle(originQuestions), function (question, index) {
      questions.push({
        id: index,
        question: question
      });
    });
    return questions;
  }

  shuffle(array) {
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
