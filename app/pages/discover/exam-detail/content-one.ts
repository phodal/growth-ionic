import {Component} from '@angular/core';

@Component({
  template: `
  <div text-center padding class="transparent-bg white content-container">
    <ion-icon ios="md-ionic" md="md-ionic" class="content-icon"></ion-icon>
    <h1>Framework</h1>
    <span class="white text-div">Hands down the best way to build high performance, cross-platform apps that can run on any screen! 100% free and open-source forever. Available under the MIT license.</span>
  </div>
  `
})
export class PageOne {
  constructor() {
  }
}
