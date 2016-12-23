import {Animation, PageTransition} from "ionic-angular";
import {isPresent} from "ionic-angular/util/util";

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
