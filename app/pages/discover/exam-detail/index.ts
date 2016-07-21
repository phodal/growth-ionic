import {Component, ViewChild} from "@angular/core";
import {PagingComponent, PageObject, AnimationReadyEvent} from "../../effect/paging-conponents";
import {BodyContent} from "./body-content";

@Component({
  directives: [BodyContent, PagingComponent],
  templateUrl: "build/pages/discover/exam-detail/index.html",
})
export class ExamDetailPage {
  @ViewChild('bodyContent') bodyContent: BodyContent;

  private pages: PageObject[];

  private activeIndex: number = 0;
  private nextIndex: number = 0;

  constructor() {
  }

  ionViewWillEnter() {
    let tempPages: PageObject[] = [];
    tempPages.push({iconName: 'ionic'});
    tempPages.push({iconName: 'cloud-outline'});
    tempPages.push({iconName: 'ionitron'});
    this.pages = tempPages;
    this.pageChangeAnimationReady();
  }

  swipeLeftToRight() {
    if ( this.nextIndex < this.pages.length - 1 ) {
      this.nextIndex++;
    }
  }

  swipeRightToLeft() {
    if ( this.nextIndex > 0 ) {
      this.nextIndex--;
    }
  }

  pageChangeAnimationReady(event: AnimationReadyEvent = { animation: null}) {
    this.bodyContent.processTransition(this.activeIndex, this.nextIndex, event.animation).then( () => {
      this.activeIndex = this.nextIndex;
    });
  }
}
