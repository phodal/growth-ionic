import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  Output,
  QueryList,
  SimpleChange,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {Animation, Content, ViewController} from "ionic-angular";

import {ANIMATION_DURATION} from "../../utils/constants";

@Component({
  selector: `paging-component`,
  template: `
    <div class="circle-animation-helper" #zoomCircleRef
     [class.blue]="selectedIndex === 0"
     [class.green]="selectedIndex === 1"
     [class.purple]="selectedIndex === 2"
     [class.turqoise]="selectedIndex === 3"
     [class.river]="selectedIndex === 4"
     [class.asphalt]="selectedIndex === 5"
     [class.concrete]="selectedIndex === 6"
     [class.emerald]="selectedIndex === 7"
     [class.carrot]="selectedIndex === 8"
     [class.red]="selectedIndex === 9"
    ></div>
    <div class="paging-container" #container [style.opacity]="initialized ? 1.0 : 0.0">
      <div *ngFor="let pageObject of pages; let i = index" class="paging-circle-wrapper" #pagingCircleWrapperElements>
        <div class="paging-circle">
          <div class="inner-circle">
            <ion-icon [name]="pageObject.iconName" class="paging-icon" [class.blue-text]="i === 0" [class.green-text]="i === 1" [class.purple-text]="i === 2"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PagingComponent {
  @Input() pages:PageObject[];
  @Input() selectedIndex:number;

  @Output() animationReady:EventEmitter<AnimationReadyEvent> = new EventEmitter<AnimationReadyEvent>();

  @ViewChild("zoomCircleRef", {read: ElementRef}) zoomCircleRef:ElementRef;
  @ViewChild("container", {read: ElementRef}) container:ElementRef;
  @ViewChildren("pagingCircleWrapperElements", {read: ElementRef}) queryList:QueryList<ElementRef>;

  private parentElement:ElementRef;
  private previousIndex:number;
  private currentAmountShiftedInPx:number = 0;
  private initialized:boolean = false;
  private ignoreFirst:boolean = true;

  constructor(@Host() host:Content, private ngZone:NgZone, private viewController:ViewController) {
    this.parentElement = host.getElementRef();

    viewController.didEnter.subscribe(() => {
      this.ignoreFirst = true;
      let callback = () => {
        this.ngZone.run(() => {
          this.initialized = true;
        });
      };
      this.selectedIndexChanged(this.selectedIndex, callback, false);
    });
  }

  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    let self = this;
    let change = changes["selectedIndex"];
    if (change) {
      this.previousIndex = typeof change.previousValue === "number" ? change.previousValue : -1;
      if (this.initialized) {
        let callback = () => {
          self.animationReady.emit(null);
        };
        this.selectedIndexChanged(change.currentValue, null, true);
      }
    }
  }

  selectedIndexChanged(newIndex:number, callback:() => any, doAnimation:boolean = true) {
    let centerPoint = this.container.nativeElement.clientWidth / 2;
    let pagingCircleWrapperElements = this.queryList.toArray();

    let selectedItemCenterPoint;
    if (this.previousIndex === -1) {
      selectedItemCenterPoint = pagingCircleWrapperElements[newIndex].nativeElement.offsetLeft + (pagingCircleWrapperElements[newIndex].nativeElement.offsetWidth / 2 + SMALL_CIRCLE_DIAMETER / 2);
    }

    if (this.previousIndex < newIndex) {
      selectedItemCenterPoint = pagingCircleWrapperElements[newIndex].nativeElement.offsetLeft + (pagingCircleWrapperElements[newIndex].nativeElement.offsetWidth / 2);
    } else if (this.previousIndex > newIndex) {
      selectedItemCenterPoint = pagingCircleWrapperElements[newIndex].nativeElement.offsetLeft + (pagingCircleWrapperElements[newIndex].nativeElement.offsetWidth / 2);
    }

    let previousDistanceNeededToMove = this.currentAmountShiftedInPx;
    this.currentAmountShiftedInPx = centerPoint - selectedItemCenterPoint;

    let animation = new Animation(this.container.nativeElement);
    animation.fromTo("translateX", `${previousDistanceNeededToMove}px`, `${this.currentAmountShiftedInPx}px`);

    for (let i = 0; i < pagingCircleWrapperElements.length; i++) {
      let pagingCircleWrapperRef = pagingCircleWrapperElements[i];
      let childAnimation = this.buildChildAnimation(newIndex, i, pagingCircleWrapperRef, previousDistanceNeededToMove, this.currentAmountShiftedInPx);
      animation.add(childAnimation);

      if (i === newIndex) {
        if (this.ignoreFirst) {
          this.ignoreFirst = false;
        } else {
          let circleAnimation = new Animation(this.zoomCircleRef.nativeElement);
          let animationOriginY = pagingCircleWrapperElements[newIndex].nativeElement.offsetTop + SMALL_CIRCLE_DIAMETER / 2;

          let circleXOrigin = selectedItemCenterPoint - SMALL_CIRCLE_DIAMETER / 2;
          circleAnimation.fromTo("translateX", `${circleXOrigin + previousDistanceNeededToMove}px`, `${circleXOrigin + this.currentAmountShiftedInPx}px`);

          let scaleX = this.parentElement.nativeElement.clientWidth / this.zoomCircleRef.nativeElement.clientWidth;
          let scaleY = this.parentElement.nativeElement.clientHeight / this.zoomCircleRef.nativeElement.clientHeight;
          let scale = Math.max(scaleX, scaleY) * 2;
          scale = Math.ceil(scale);

          circleAnimation.fromTo("translateY", `${animationOriginY}px`, `${animationOriginY}px`);
          circleAnimation.fromTo("opacity", `0.9`, `1.0`);
          circleAnimation.fromTo("scale", `1.0`, `${scale}`, true);

          animation.add(circleAnimation);
        }
      }
    }

    if (doAnimation) {
      animation.duration(ANIMATION_DURATION);
    }

    if (callback) {
      animation.onFinish(callback);
    }

    if (this.initialized) {
      this.animationReady.emit({animation: animation});
    } else {
      animation.play();
    }
  }

  buildChildAnimation(selectedIndex:number, currentIndex:number, pagingCircleWrapperRef:ElementRef, originalOffset:number, newOffset:number) {
    let animation = new Animation(pagingCircleWrapperRef.nativeElement);
    let circleElement = <HTMLElement> pagingCircleWrapperRef.nativeElement.children[0];
    let innerCircleElement = circleElement.children[0];
    let circleAnimation = new Animation(circleElement);
    let innerCircleAnimation = new Animation(innerCircleElement);
    if (currentIndex === selectedIndex) {
      innerCircleAnimation.fromTo("opacity", "0.0", "1.0");
      circleAnimation.fromTo("scale", `0.5`, `1.0`);
    } else {
      if (currentIndex === this.previousIndex) {
        innerCircleAnimation.fromTo("opacity", "1.0", "0.0");
        circleAnimation.fromTo("scale", `1.0`, `0.5`);
      } else {
        circleAnimation.fromTo("scale", `0.5`, `0.5`);
      }
    }
    animation.add(circleAnimation);
    animation.add(innerCircleAnimation);
    return animation;
  }
}

export interface PageObject {
  iconName?:string;
}

export interface AnimationReadyEvent {
  animation:Animation;
}

export const SMALL_CIRCLE_DIAMETER = 20;
export const LARGE_CIRCLE_DIAMETER = 40;
