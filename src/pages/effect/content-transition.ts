import {ANIMATION_DURATION} from "../../utils/constants";
import {Transition, ViewController, Animation, PageTransition} from "ionic-angular";
import { isPresent } from 'ionic-angular/util/util';

export const TRANSITION_IN_KEY:string = "bodyContentEnter";
export const TRANSITION_OUT_KEY:string = "bodyContentExit";

const DURATION = 500;
const OPACITY = 'opacity';
const TRANSPARENT = 0;
const OPAQUE = 1;

export class FadeTransition extends PageTransition {
  init() {
    super.init();

    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    this.duration(isPresent(opts.duration) ? opts.duration : DURATION);
    const backDirection = (opts.direction === 'back');

    if (enteringView) {
      const enteringPageEle: Element = enteringView.pageRef().nativeElement;
      const enteringContent = new Animation(enteringView.pageRef());
      this.add(enteringContent);

      if (backDirection) {
        enteringContent
          .fromTo(OPACITY, OPAQUE, OPAQUE, true);
      } else {
        enteringContent
          .fromTo(OPACITY, TRANSPARENT, OPAQUE, true);
      }
    }

    if (leavingView && leavingView.pageRef()) {
      const leavingPageEle: Element = leavingView.pageRef().nativeElement;

      const leavingContent = new Animation(leavingView.pageRef());
      this.add(leavingContent);

      if (backDirection) {
        leavingContent
          .fromTo(OPACITY, OPAQUE, TRANSPARENT, false);
      } else {
        leavingContent
          .fromTo(OPACITY, OPAQUE, OPAQUE, false);
      }
    }
  }
}

export class BodyContentInTransition extends Transition {
  // constructor(parameters: {enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions}) {
  //   let {enteringView, leavingView, opts} = parameters;
  //   super(enteringView, leavingView, opts);
  //
  //   // DOM READS
  //   let enteringElement = <HTMLElement> enteringView.pageRef().nativeElement;
  //   let enteringContent = enteringElement.querySelector(".content-container");
  //   let enteringAnimation = new Animation(enteringContent);
  //   enteringAnimation.fromTo("translateY", `${150}px`, `${0}px`);
  //   enteringAnimation.fromTo("opacity", `0.0`, `1.0`);
  //
  //   let exitingAnimation = null;
  //   if (leavingView.pageRef()) {
  //     let exitingElement = <HTMLElement> leavingView.pageRef().nativeElement;
  //     let exitingContent = exitingElement.querySelector(".content-container");
  //     exitingAnimation = new Animation(exitingContent);
  //     exitingAnimation.fromTo("translateY", `${0}px`, `${-150}px`);
  //     exitingAnimation.fromTo("opacity", `1.0`, `0.0`);
  //   }
  //
  //   this.element(enteringView.pageRef()).easing("ease").duration(ANIMATION_DURATION)
  //     .beforeAddClass("show-page")
  //     .add(enteringAnimation);
  //
  //   if (exitingAnimation) {
  //     this.add(exitingAnimation);
  //   }
  //   if (opts['ev'] && opts['ev'].animation) {
  //     this.add(opts['ev'].animation);
  //   }
  // }
}
export class BodyContentOutTransition extends Transition {
  // constructor(enteringView:ViewController, leavingView:ViewController, opts:TransitionOptions) {
  //   super(enteringView, leavingView, opts);
  //   // DOM READS
  //   let enteringElement = <HTMLElement> enteringView.pageRef().nativeElement;
  //   let enteringContent = enteringElement.querySelector(".content-container");
  //   let enteringAnimation = new Animation(enteringContent);
  //   enteringAnimation.fromTo("translateY", `${150}px`, `${0}px`);
  //   enteringAnimation.fromTo("opacity", `0.0`, `1.0`);
  //
  //   let exitingAnimation = null;
  //   if (leavingView.pageRef()) {
  //     let exitingElement = <HTMLElement> leavingView.pageRef().nativeElement;
  //     let exitingContent = exitingElement.querySelector(".content-container");
  //     exitingAnimation = new Animation(exitingContent);
  //     exitingAnimation.fromTo("translateY", `${0}px`, `${-150}px`);
  //     exitingAnimation.fromTo("opacity", `1.0`, `0.0`);
  //   }
  //
  //   this.element(leavingView.pageRef()).easing("ease").duration(ANIMATION_DURATION)
  //     .beforeAddClass("show-page")
  //     .add(enteringAnimation);
  //
  //   if (exitingAnimation) {
  //     this.add(exitingAnimation);
  //   }
  //
  //   if (opts['ev'] && opts['ev'].animation) {
  //     this.add(opts['ev'].animation);
  //   }
  // }
}
